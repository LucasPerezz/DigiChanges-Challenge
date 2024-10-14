import { Router } from "express";
import { getPeople, getPeopleByName } from "./people.controller";

const peopleRouter = Router();

peopleRouter.get('/', getPeople);

peopleRouter.get('/:name', getPeopleByName);


export default peopleRouter;