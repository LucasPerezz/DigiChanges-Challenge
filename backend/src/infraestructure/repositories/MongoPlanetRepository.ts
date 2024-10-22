import { PaginateResult } from "mongoose";
import { Planet } from "../../domain/entities/Planet";
import { IPlanetRepository } from "../../domain/interfaces/IPlanetRepository";
import { PlanetModel } from "../models/PlanetModel";
import { IFilterName } from "../../domain/interfaces/IFilterName";

export class MongoPlanetRepository implements IPlanetRepository {
  async getPlanets(
    filters: IFilterName,
    options: { limit: number; offset: number }
  ): Promise<Planet[]> {
    const result: PaginateResult<Planet> = await PlanetModel.paginate(
      filters,
      options
    );
    return result.docs;
  }

  async getPlanetByName(name: string): Promise<Planet | null> {
    const planet = await PlanetModel.findOne({ name: name }).lean();
    return planet as Planet | null;
  }

  async syncPlanetsData(planets: Planet[]): Promise<void> {
    const names = planets.map((planet) => planet.name);

    const existingPlanets = await PlanetModel.find({ name: { $in: names } });

    const newPlanets = planets.filter(
      (planet) =>
        !existingPlanets.some(
          (existingPlanet) => existingPlanet.name === planet.name
        )
    );

    if (newPlanets.length > 0) {
      await PlanetModel.insertMany(newPlanets);
      console.log(`Synchronized ${newPlanets.length} films`);
    } else {
      console.log(`No new films to synchronize`);
    }
  }
}
