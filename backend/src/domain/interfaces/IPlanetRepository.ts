import { Planet } from "../entities/Planet";

export interface IPlanetRepository {
  getPlanets(filters: any, options: {limit: number; offset: number}): Promise<Planet[]>;
  getPlanetByName(name: string): Promise<Planet | null>;
  syncPlanetsData(planets: Planet[]): Promise<void>;
}
