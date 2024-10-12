import { Router } from "express";
import { getStarshipById, getStarships } from "./starship.controller";

const starshipRouter = Router();

starshipRouter.get('/', getStarships);

starshipRouter.get('/:id', getStarshipById);

export default starshipRouter;