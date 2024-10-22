import { Planet } from "../../domain/entities/Planet";
import { IPlanetRepository } from "../../domain/interfaces/IPlanetRepository";

export class GetPlanets {
  constructor(private planetRepository: IPlanetRepository) {}

  async execute(filters: any, options: {limit: number; offset: number}): Promise<Planet[]> {
    return await this.planetRepository.getPlanets(filters, options);
  }
}
