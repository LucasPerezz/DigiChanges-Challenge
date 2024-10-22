import { Planet } from "../../domain/entities/Planet";
import { IPlanetRepository } from "../../domain/interfaces/IPlanetRepository";

export class SyncPlanetsData {
  private readonly planetRepository: IPlanetRepository;

  constructor(planetRepository: IPlanetRepository) {
    this.planetRepository = planetRepository;
  }

  async execute() {
    try {
      let page = 1;
      let response = await fetch(
        `https://swapi.dev/api/planets/?page=${page}&format=json`
      );

      if (!response.ok) {
        throw new Error("Error fetching planets data");
      }

      while (response.ok) {
        const data = await response.json();
        const planets: Planet[] = data.results.map((planet: Planet) => ({
          name: planet.name,
          rotation_period: planet.rotation_period,
          orbital_period: planet.orbital_period,
          diameter: planet.diameter,
          climate: planet.climate,
          gravity: planet.gravity,
          terrain: planet.terrain,
          surface_water: planet.surface_water,
          population: planet.population,
          residents: planet.residents,
          films: planet.films,
          created: planet.created,
          edited: planet.edited,
          url: planet.url,
        }));

        await this.planetRepository.syncPlanetsData(planets);

        if (data.next) {
          page++;
          response = await fetch(
            `https://swapi.dev/api/planets/?page=${page}&format=json`
          );
        } else {
          break;
        }
      }
    } catch (error) {
      console.error("Error synchronizing data:", error);
    }
  }
}
