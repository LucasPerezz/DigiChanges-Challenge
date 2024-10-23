import { Planet } from "../entities/Planet";
import { IFilterName } from "./IFilterName";

export interface IPlanetRepository {
  getPlanets(
    filters: IFilterName,
    options: { limit: number; offset: number }
  ): Promise<Planet[]>;
  getPlanetByName(name: string): Promise<Planet | null>;
  syncPlanetsData(planets: Planet[]): Promise<void>;
}
