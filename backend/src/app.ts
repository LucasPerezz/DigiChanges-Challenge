// Librerias
import express, { Express } from "express";
import cron from "node-cron";
import cors from "cors";
import mongoose from "mongoose";

// Cron
import "./infraestructure/cron/cron";

// Rutas
import filmRoutes from "./interface/routes/filmRoutes";
import personRoutes from "./interface/routes/personRoutes";
import starshipRoutes from "./interface/routes/starshipRoutes";
import planetRoutes from "./interface/routes/planetRoutes";

// Configuraciones
const app: Express = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Endpoints
app.use("/api/v1/people", personRoutes);
app.use("/api/v1/films", filmRoutes);
app.use("/api/v1/starships", starshipRoutes);
app.use("/api/v1/planets", planetRoutes);

// Servidor
const server = app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });

// MongoDB
const mongoUri =
  "mongodb+srv://perezlucas2609:perezlucas2609@cluster0.q8zwb.mongodb.net/";

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

export { app, server };
