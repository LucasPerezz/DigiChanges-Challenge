import { Request, Response } from "express";
import planetModel from "./planet.model";

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export const syncPlanetsDataToDB = async (): Promise<void> => {
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

      const planetNames = planets.map((planet) => planet.name);

      const existingPlanets = await planetModel.find({
        name: { $in: planetNames },
      });

      const newPlanets = planets.filter(
        (planet) =>
          !existingPlanets.some(
            (existingPlanet) => existingPlanet.name === planet.name
          )
      );

      if (newPlanets.length > 0) {
        await planetModel.insertMany(newPlanets);
        console.log(`Synchronized ${newPlanets.length} planets`);
      } else {
        console.log(`No new planets to synchronize`);
      }

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
};

export const getPlanets = async (req: Request, res: Response) => {
  try {
    const { limit, offset, name } = req.query;

    const options = {
      offset: Number(offset) || 0,
      limit: Number(limit) || 10,
    };

    const filters: any = {};

    if (name) filters.name = { $regex: name, $options: "i" };

    const planets = await planetModel.paginate(filters, options);

    res.status(200).json(planets);
  } catch (error) {
    res.status(500).json({ message: `Error fetching data` });
  }
};

export const getPlanetsByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const planet = await planetModel.findOne({ name: name });
    planet
      ? res.status(200).json(planet)
      : res
          .status(400)
          .json({ msg: `Doesn't exists ${name} planet`, code: res.statusCode });
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};
