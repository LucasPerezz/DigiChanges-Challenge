import { IStarshipRepository } from "../../domain/interfaces/IStarshipRepository";
import { Starship } from "../../domain/entities/Starship";

export class GetStarships {
  constructor(private starshipRepository: IStarshipRepository) {}

  async execute(
    filters: any,
    options: { limit: number; offset: number }
  ): Promise<Starship[]> {
    return await this.starshipRepository.getStarships(filters, options);
  }
}
