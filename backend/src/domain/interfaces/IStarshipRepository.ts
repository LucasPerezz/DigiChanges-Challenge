import { Starship } from "../entities/Starship";

export interface IStarshipRepository {
    getStarships(filters: any, options: {limit: number; offset: number}): Promise<Starship[]>;
    getStarshipByName(name: string): Promise<Starship | null>;
    syncStarshipsData(starships: Starship[]): Promise<void>;
}