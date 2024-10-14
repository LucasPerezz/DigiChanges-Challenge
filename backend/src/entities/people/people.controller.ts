import { Request, Response } from "express";
import peopleModel from "./people.model";

export const syncPeopleDataToDB = async () => {
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
      const people = data.results;

      for (const person of people) {
        const personData = {
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
        };

        const existingPerson = await peopleModel.findOne({ name: person.name });

        if (!existingPerson) {
          const newPerson = new peopleModel(personData);
          await newPerson.save();
          console.log(`Synchronized: ${person.name}`);
        } else {
          console.log(`${person.name} already exists in the database`);
        }
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

export const getPeople = async (_req: Request, res: Response) => {
  try {
    const people = await peopleModel.find();
    res.status(200).json(people);
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};

export const getPeopleByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const people = await peopleModel.findOne({ name: name });
    people
      ? res.status(200).json(people)
      : res
          .status(400)
          .json({
            msg: `Doesn't exists ${name} character`,
            code: res.statusCode,
          });
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};
