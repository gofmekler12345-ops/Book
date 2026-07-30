import express from "express";
import errorHandler from "./middlewares/error.middleware.js";
import bookRoutes from "./routes/book.routes.js";
import {dbConnection} from "./configurethion/database.js";
import {syncModels} from "./models/index.js";

const app = express();

app.use(express.json());

app.use(bookRoutes)

app.use(errorHandler);

app.use((req, res) => res.status(404).type('text/plain; charset=utf-8').send('Not Found'));

async function startServer() {
    await dbConnection();
    await syncModels();
    app.listen(process.env.PORT || 8000, () => console.log(`Server running on port ${process.env.PORT || 8000}. Press Ctrl+C to stop`));
}

startServer();