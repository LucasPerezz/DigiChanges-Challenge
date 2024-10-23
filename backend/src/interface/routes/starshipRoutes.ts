import { Router } from "express";
import { StarshipController } from "../controllers/StarshipController";
import { GetStarships } from "../../use-cases/starships/GetStarships";
import { GetStarshipByName } from "../../use-cases/starships/GetStarshipByName";
import { MongoStarshipRepository } from "../../infraestructure/repositories/MongoStarshipRepository";

const starshipRepository = new MongoStarshipRepository();
const getStarshipsUseCase = new GetStarships(starshipRepository);
const getStarshipByNameUseCase = new GetStarshipByName(starshipRepository);
const starshipController = new StarshipController(
  getStarshipsUseCase,
  getStarshipByNameUseCase
);

const starshipRoutes = Router();

starshipRoutes.get("/", (req, res) =>
  starshipController.getStarships(req, res)
);

starshipRoutes.get("/:name", (req, res) =>
  starshipController.getStarshipByName(req, res)
);

export default starshipRoutes;
