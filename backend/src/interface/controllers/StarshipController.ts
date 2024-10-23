import { Request, Response } from "express";
import { GetStarships } from "../../use-cases/starships/GetStarships";
import { GetStarshipByName } from "../../use-cases/starships/GetStarshipByName";
import { IFilterName } from "../../domain/interfaces/IFilterName";

export class StarshipController {
  private readonly getStarshipsUseCase: GetStarships;
  private readonly getStarshipByNameUseCase: GetStarshipByName;

  constructor(
    getStarshipUseCase: GetStarships,
    getStarshipByNameUseCase: GetStarshipByName
  ) {
    this.getStarshipsUseCase = getStarshipUseCase;
    this.getStarshipByNameUseCase = getStarshipByNameUseCase;
  }

  async getStarships(req: Request, res: Response) {
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

      const starships = await this.getStarshipsUseCase.execute(
        filters,
        options
      );

      res.status(200).json(starships);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  async getStarshipByName(req: Request, res: Response) {
    try {
      const { name } = req.params;

      const starship = await this.getStarshipByNameUseCase.execute(name);

      if (starship) {
        res.status(200).json(starship);
      } else {
        res
          .status(404)
          .json({ message: `Starship with name "${name}" not found` });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}
