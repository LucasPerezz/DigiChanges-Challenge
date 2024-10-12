import { Router } from "express";
import { getPlanets, getPlanetsById } from "./planet.controller";

const planetsRouter = Router();

planetsRouter.get('/', getPlanets);

planetsRouter.get('/:id', getPlanetsById);

export default planetsRouter;