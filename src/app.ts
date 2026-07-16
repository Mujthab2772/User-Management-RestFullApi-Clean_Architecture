import 'dotenv/config'
import express from 'express'
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./infrastructure/config/swagger";
import authRoute from './presentation/routes/auth.routes'
import userRoute from './presentation/routes/user.routes'
import { authMiddleware } from './presentation/middlewares/auth.middleware'
import { errorMiddleware } from './presentation/middlewares/errorMiddleware'


const app = express()

app.use(express.json())

app.use('/auth', authRoute)

app.use('/users', authMiddleware, userRoute)

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(errorMiddleware)

export default app