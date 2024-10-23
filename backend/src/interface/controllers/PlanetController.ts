import { Request, Response } from "express";
import { GetPlanets } from "../../use-cases/planets/GetPlanets";
import { GetPlanetByName } from "../../use-cases/planets/GetPlanetByName";
import { IFilterName } from "../../domain/interfaces/IFilterName";

export class PlanetController {
  private readonly getPlanetUseCase: GetPlanets;
  private readonly getPlanetByNameUseCase: GetPlanetByName;

  constructor(
    getPlanetUseCase: GetPlanets,
    getPlanetByNameUseCase: GetPlanetByName
  ) {
    this.getPlanetUseCase = getPlanetUseCase;
    this.getPlanetByNameUseCase = getPlanetByNameUseCase;
  }

  async getPlanets(req: Request, res: Response) {
    try {
      const { limit, offset, name } = req.query;

      const options = {
        offset: Number(offset) || 0,
        limit: Number(limit) || 10,
      };

      const filters: IFilterName = {};

      if (typeof name === "string") {
        filters.name = { $regex: name, $options: "i" };
      }

      const planets = await this.getPlanetUseCase.execute(filters, options);

      res.status(200).json(planets);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  async getPlanetByName(req: Request, res: Response) {
    try {
      const { name } = req.params;

      const planet = await this.getPlanetByNameUseCase.execute(name);

      if (planet) {
        res.status(200).json(planet);
      } else {
        res
          .status(404)
          .json({ message: `Planet with name "${name}" not found` });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}
