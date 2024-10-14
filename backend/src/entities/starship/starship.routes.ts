import { Router } from "express";
import { getStarshipByName, getStarships } from "./starship.controller";

const starshipRouter = Router();

starshipRouter.get('/', getStarships);

starshipRouter.get('/:name', getStarshipByName);

export default starshipRouter;