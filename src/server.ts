import app from "./app";
import { connectMongo } from "./infrastructure/database/mongo";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

startServer();
