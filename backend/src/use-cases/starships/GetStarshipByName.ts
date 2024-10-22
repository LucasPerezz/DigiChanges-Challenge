import { IStarshipRepository } from "../../domain/interfaces/IStarshipRepository";
import { Starship } from "../../domain/entities/Starship";

export class GetStarshipByName {
  constructor(private starshipRepository: IStarshipRepository) {}

  async execute(name: string): Promise<Starship | null> {
    return await this.starshipRepository.getStarshipByName(name);
  }
}
