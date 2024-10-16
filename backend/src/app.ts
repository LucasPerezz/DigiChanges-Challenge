// Librerias
import express, { Express } from "express";
import cron from "node-cron";
import cors from "cors";
import mongoose from "mongoose";

// Cron
import { syncData } from "./cron/cron";

// Rutas
import peopleRouter from "./entities/people/people.routes";
import filmRouter from "./entities/film/film.routes";
import starshipRouter from "./entities/starship/starship.routes";
import planetsRouter from "./entities/planet/planet.routes";


// Configuraciones
const app: Express = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Endpoints
app.use("/api/v1/people", peopleRouter);
app.use("/api/v1/films", filmRouter);
app.use("/api/v1/starships", starshipRouter);
app.use("/api/v1/planets", planetsRouter);

// Fuerza la sincronizacion de datos desde la api hasta la base de datos
syncData();

cron.schedule("0 * * * *", () => {
  console.log("running a task every hour");
});

// Servidor
const server = app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });

// MongoDB
const mongoUri = "mongodb+srv://perezlucas2609:perezlucas2609@cluster0.q8zwb.mongodb.net/";

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

export { app, server };
