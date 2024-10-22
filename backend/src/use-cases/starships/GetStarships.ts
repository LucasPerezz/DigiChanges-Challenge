import { IStarshipRepository } from "../../domain/interfaces/IStarshipRepository";
import { Starship } from "../../domain/entities/Starship";
import { IFilterName } from "../../domain/interfaces/IFilterName";

export class GetStarships {
  constructor(private starshipRepository: IStarshipRepository) { }

  async execute(
    filters: IFilterName,
    options: { limit: number; offset: number }
  ): Promise<Starship[]> {
    return await this.starshipRepository.getStarships(filters, options);
  }
}
