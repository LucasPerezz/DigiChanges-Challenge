import { Request, Response } from "express";
import planetModel from "./planet.model";

export const syncPlanetsDataToDB = async () => {
    try {
      let page = 1;
      let response = await fetch(`https://swapi.dev/api/planets/?page=${page}&format=json`);
  
      if (!response.ok) {
        throw new Error("Error fetching planets data");
      }
  
      while (response.ok) {
        const data = await response.json();
        const planets = data.results;
  
        for (const planet of planets) {
          const planetData = {
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
            url: planet.url
          };
  
          const existingPlanet = await planetModel.findOne({ name: planet.name });
  
          if (!existingPlanet) {
            const newPlanet = new planetModel(planetData);
            await newPlanet.save();
            console.log(`Synchronized: ${planet.name}`);
          } else {
            console.log(`${planet.name} already exists in the database`);
          }
        }
  
        if (data.next) {
          page++;
          response = await fetch(`https://swapi.dev/api/planets/?page=${page}&format=json`);
        } else {
          break;
        }
      }
    } catch (error) {
      console.error("Error synchronizing data:", error);
    }
  };
  

export const getPlanets = async (_req: Request, res: Response) => {
    try {
        const planets = await planetModel.find();
        res.status(200).json(planets);
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

export const getPlanetsByName = async (req: Request, res: Response) => {
    try {
        const {name} = req.params;
        const planet = await planetModel.findOne({name: name});
        res.status(200).json(planet);
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}