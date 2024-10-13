import { Router } from "express";
import { getStarshipById, getStarships } from "./starship.controller";

const starshipRouter = Router();

starshipRouter.get('/', getStarships);

starshipRouter.get('/:name', getStarshipById);

export default starshipRouter;