import { Planet } from "../../domain/entities/Planet";
import { IPlanetRepository } from "../../domain/interfaces/IPlanetRepository";

export class GetPlanetByName {
  constructor(private planetRepository: IPlanetRepository) {}

  async execute(name: string): Promise<Planet | null> {
    return await this.planetRepository.getPlanetByName(name);
  }
}
