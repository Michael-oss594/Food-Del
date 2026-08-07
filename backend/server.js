import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js"

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Debug middleware: log headers for upload requests
app.use((req, res, next) => {
    if (req.method === 'POST' && req.url && req.url.startsWith('/api/food')) {
        console.log('--- Incoming upload request ---');
        console.log('URL:', req.url);
        console.log('Content-Type:', req.headers['content-type']);
        console.log('Content-Length:', req.headers['content-length']);
    }
    next();
});

// api endpoints
app.use("/api/food",foodRouter)

app.get("/", (req, res) => {
    res.send("API Working");
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server Started on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
    }
};

startServer();