import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "path"; // Required for serving static files
import formRoutes from "./routes/formRoutes.js";
import insightsRoutes from "./routes/insightsRoutes.js";

const app = express();
const __dirname = path.resolve(); // For ESM compatibility

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// API Routes
app.use("/submit", formRoutes);
app.use("/insights", insightsRoutes);

// Serve Static React Files
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
