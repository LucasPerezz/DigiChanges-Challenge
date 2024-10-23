import { Router } from "express";
import { FilmController } from "../controllers/FilmController";
import { GetFilms } from "../../use-cases/films/GetFilms";
import { MongoFilmRepository } from "../../infraestructure/repositories/MongoFilmRepository";
import { GetFilmByTitle } from "../../use-cases/films/GetFilmByTitle";

const filmRepository = new MongoFilmRepository();
const getFilmsUseCase = new GetFilms(filmRepository);
const getFilmByTitleUseCase = new GetFilmByTitle(filmRepository);
const filmController = new FilmController(
  getFilmsUseCase,
  getFilmByTitleUseCase
);

const filmRoutes = Router();

filmRoutes.get("/", (req, res) => filmController.getFilms(req, res));

filmRoutes.get("/:title", (req, res) =>
  filmController.getFilmsByName(req, res)
);

export default filmRoutes;
