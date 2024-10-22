import { Planet } from "../../domain/entities/Planet";
import { IFilterName } from "../../domain/interfaces/IFilterName";
import { IPlanetRepository } from "../../domain/interfaces/IPlanetRepository";

export class GetPlanets {
  constructor(private planetRepository: IPlanetRepository) { }

  async execute(filters: IFilterName, options: { limit: number; offset: number }): Promise<Planet[]> {
    return await this.planetRepository.getPlanets(filters, options);
  }
}
