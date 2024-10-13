import { Router } from "express";
import { getPlanets, getPlanetsById } from "./planet.controller";

const planetsRouter = Router();

planetsRouter.get('/', getPlanets);

planetsRouter.get('/:name', getPlanetsById);

export default planetsRouter;