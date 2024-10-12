import { Router } from "express";
import { getPeople, getPeopleById } from "./people.controller";

const peopleRouter = Router();

peopleRouter.get('/', getPeople);

peopleRouter.get('/:name', getPeopleById);


export default peopleRouter;