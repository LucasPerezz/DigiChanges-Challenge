import { Router } from "express";
import { getPlanets, getPlanetsByName } from "./planet.controller";

const planetsRouter = Router();

planetsRouter.get('/', getPlanets);

planetsRouter.get('/:name', getPlanetsByName);

export default planetsRouter;