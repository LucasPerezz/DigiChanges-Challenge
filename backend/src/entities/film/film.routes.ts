import { Router } from "express";
import { getFilmByTitle, getFilms } from "./film.controller";

const filmRouter = Router();

filmRouter.get("/", getFilms);

filmRouter.get("/:title", getFilmByTitle);

export default filmRouter;
