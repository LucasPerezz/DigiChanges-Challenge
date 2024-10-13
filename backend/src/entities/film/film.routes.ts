import { Router } from "express";
import { getFilmById, getFilms } from "./film.controller";

const filmRouter = Router();

filmRouter.get('/', getFilms);

filmRouter.get('/:title', getFilmById);

export default filmRouter;