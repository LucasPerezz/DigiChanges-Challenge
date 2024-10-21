import { Request, Response } from "express";
import peopleModel from "./people.model";

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export const syncPeopleDataToDB = async (): Promise<void> => {
  try {
    let page = 1;
    let response = await fetch(
      `https://swapi.dev/api/people/?page=${page}&format=json`
    );

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    while (response.ok) {
      const data = await response.json();
      const people: Person[] = data.results.map((person: Person) => ({
        name: person.name,
        height: person.height,
        mass: person.mass,
        hair_color: person.hair_color,
        skin_color: person.skin_color,
        eye_color: person.eye_color,
        birth_year: person.birth_year,
        gender: person.gender,
        homeworld: person.homeworld,
        films: person.films,
        species: person.species,
        vehicles: person.vehicles,
        starships: person.starships,
        created: person.created,
        edited: person.edited,
        url: person.url,
      }));

      const names = people.map((person) => person.name);

      const existingPeople = await peopleModel.find({ name: { $in: names } });

      const newPeople = people.filter(
        (person) =>
          !existingPeople.some(
            (existingPerson) => existingPerson.name === person.name
          )
      );

      if (newPeople.length > 0) {
        await peopleModel.insertMany(newPeople);
        console.log(`Synchronized ${newPeople.length} people`);
      } else {
        console.log(`No new people to synchronize`);
      }

      if (data.next) {
        page++;
        response = await fetch(
          `https://swapi.dev/api/people/?page=${page}&format=json`
        );
      } else {
        break;
      }
    }
  } catch (error) {
    console.error("Error synchronizing data:", error);
  }
};

export const getPeople = async (req: Request, res: Response) => {
  try {
    const { limit, offset, name } = req.query;

    const options = {
      offset: Number(offset) || 0,
      limit: Number(limit) || 10,
    };

    const filters: any = {};

    if (name) filters.name = { $regex: name, $options: "i" };

    const people = await peopleModel.paginate(filters, options);

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ message: `Error fetching data` });
  }
};

export const getPeopleByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const people = await peopleModel.findOne({ name: name });
    people
      ? res.status(200).json(people)
      : res.status(400).json({
          msg: `Doesn't exists ${name} character`,
          code: res.statusCode,
        });
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};
