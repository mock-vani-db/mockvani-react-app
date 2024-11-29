import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import formRoutes from "./routes/formRoutes.js";
import insightsRoutes from "./routes/insightsRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requests from this IP, please try again after 15 minutes",
});

// Apply rate limiting middleware to all routes
app.use(limiter);

// Use your routes
app.use("/submit", formRoutes);
app.use("/insights", insightsRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
