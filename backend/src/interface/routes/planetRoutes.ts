import { Router } from "express";
import { PlanetController } from "../controllers/PlanetController";
import { GetPlanets } from "../../use-cases/planets/GetPlanets";
import { GetPlanetByName } from "../../use-cases/planets/GetPlanetByName";
import { MongoPlanetRepository } from "../../infraestructure/repositories/MongoPlanetRepository";

const planetRepository = new MongoPlanetRepository();
const getPlanetsUseCase = new GetPlanets(planetRepository);
const getPlanetByNameUseCase = new GetPlanetByName(planetRepository);
const planetController = new PlanetController(
  getPlanetsUseCase,
  getPlanetByNameUseCase
);

const planetRoutes = Router();

planetRoutes.get("/", (req, res) => planetController.getPlanets(req, res));

planetRoutes.get("/:name", (req, res) =>
  planetController.getPlanetByName(req, res)
);

export default planetRoutes;
