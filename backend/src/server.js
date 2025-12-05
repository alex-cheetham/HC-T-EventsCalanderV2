import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import { PORT } from "./config.js";
import settingsRouter from "./routes/settings.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/settings", settingsRouter);
app.use("/users", userRoutes);


app.listen(PORT, () =>
    console.log(`✔ Backend running on http://localhost:${PORT}`)
);
