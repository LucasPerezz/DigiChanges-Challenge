import { Request, Response } from "express";
import starshipModel from "./starship.model";

export const syncStarshipDataToDB = async () => {
  try {
    let page = 1;
    let response = await fetch(
      `https://swapi.dev/api/starships/?page=${page}&format=json`
    );

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    while (response.ok) {
      const data = await response.json();
      const starships = data.results;

      for (const starship of starships) {
        const starshipData = {
          name: starship.name,
          model: starship.model,
          manufacturer: starship.manufacturer,
          cost_in_credits: starship.cost_in_credits,
          length: starship.length,
          max_atmosphering_speed: starship.max_atmosphering_speed,
          crew: starship.crew,
          passengers: starship.passengers,
          cargo_capacity: starship.cargo_capacity,
          consumables: starship.consumables,
          hyperdrive_rating: starship.hyperdrive_rating,
          MGLT: starship.MGLT,
          starship_class: starship.starship_class,
          pilots: starship.pilots,
          films: starship.films,
          created: starship.created,
          edited: starship.edited,
          url: starship.url,
        };

        const existingStarship = await starshipModel.findOne({
          name: starship.name,
        });

        if (!existingStarship) {
          const newStarship = new starshipModel(starshipData);
          await newStarship.save();
          console.log(`Synchronized: ${starship.name}`);
        } else {
          console.log(`${starship.name} already exists in the database`);
        }
      }

      if (data.next) {
        page++;
        response = await fetch(
          `https://swapi.dev/api/starships/?page=${page}&format=json`
        );
      } else {
        break;
      }
    }
  } catch (error) {
    console.error("Error synchronizing data:", error);
  }
};

export const getStarships = async (req: Request, res: Response) => {
  try {
    const { limit, offset, name } = req.query;

    const options = {
      offset: Number(offset) || 0,
      limit: Number(limit) || 10,
    };

    const filters: any = {};

    if (name) filters.name = { $regex: name, $options: "i" };

    const starships = await starshipModel.paginate(filters, options);

    res.status(200).json(starships);
  } catch (error) {
    res.status(500).json({ message: `Error fetching data` });
  }
};

export const getStarshipByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const starship = await starshipModel.findOne({ name: name });
    starship
      ? res.status(200).json(starship)
      : res.status(400).json({
          msg: `Doesn't exists ${name} starship`,
          code: res.statusCode,
        });
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};
