import app from './app.js'
import { connectMongo } from './infrastructure/database/mongo.js'

const PORT =  process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectMongo()

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        })
    } catch (error) {
        console.log(error)

        process.exit(1)
    }
}

startServer()