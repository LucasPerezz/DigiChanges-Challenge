import { Starship } from "../entities/Starship";
import { IFilterName } from "./IFilterName";

export interface IStarshipRepository {
  getStarships(
    filters: IFilterName,
    options: { limit: number; offset: number }
  ): Promise<Starship[]>;
  getStarshipByName(name: string): Promise<Starship | null>;
  syncStarshipsData(starships: Starship[]): Promise<void>;
}
