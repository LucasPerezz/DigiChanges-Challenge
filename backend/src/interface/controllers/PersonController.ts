import { Request, Response } from "express";
import { GetPeople } from "../../use-cases/people/GetPeople";
import { GetPersonByName } from "../../use-cases/people/GetPersonByName";
import { IFilterName } from "../../domain/interfaces/IFilterName";

export class PersonController {
  private readonly getPeopleUseCase: GetPeople;
  private readonly getPersonByNameUseCase: GetPersonByName;

  constructor(
    getPeopleUseCase: GetPeople,
    getPersonByNameUseCase: GetPersonByName
  ) {
    this.getPeopleUseCase = getPeopleUseCase;
    this.getPersonByNameUseCase = getPersonByNameUseCase;
  }

  async getPeople(req: Request, res: Response) {
    try {
      const { limit, offset, name } = req.query;

      const options = {
        offset: Number(offset) || 0,
        limit: Number(limit) || 10,
      };

      const filters: IFilterName = {};

      if (typeof name === 'string') {
        filters.name = { $regex: name, $options: "i" };
      }

      const people = await this.getPeopleUseCase.execute(filters, options);

      res.status(200).json(people);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  async getPersonByName(req: Request, res: Response) {
    try {
      const { name } = req.params;

      const person = await this.getPersonByNameUseCase.execute(name);
      if (person) {
        res.status(200).json(person);
      } else {
        res
          .status(404)
          .json({ message: `Person with name "${name}" not found` });
      }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}
