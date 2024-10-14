import { Request, Response } from "express";
import { filmModel } from "./film.model";

export const syncFilmsDataToDB = async () => {
  try {
    let page = 1;
    let response = await fetch(
      `https://swapi.dev/api/films/?page=${page}&format=json`
    );

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    while (response.ok) {
      const data = await response.json();
      const films = data.results;

      for (const film of films) {
        const filmData = {
          title: film.title,
          episode_id: film.episode_id,
          opening_crawl: film.opening_crawl,
          director: film.director,
          producer: film.producer,
          release_date: film.release_date,
          characters: film.characters,
          planets: film.planets,
          starships: film.starships,
          vehicles: film.vehicles,
          species: film.species,
          created: film.created,
          edited: film.edited,
          url: film.url,
        };

        const existingFilm = await filmModel.findOne({ title: film.title });

        if (!existingFilm) {
          const newFilm = new filmModel(filmData);
          await newFilm.save();
          console.log(`Synchronized: ${film.title}`);
        } else {
          console.log(`Film ${film.title} already exists in the database`);
        }
      }

      if (data.next) {
        page++;
        response = await fetch(
          `https://swapi.dev/api/films/?page=${page}&format=json`
        );
      } else {
        break;
      }
    }
  } catch (error) {
    console.error("Error synchronizing data:", error);
  }
};

export const getFilms = async (_req: Request, res: Response) => {
  try {
    const films = await filmModel.find();
    res.status(200).json(films);
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};

export const getFilmByTitle = async (req: Request, res: Response) => {
  try {
    const { title } = req.params;
    const film = await filmModel.findOne({ title: title });
    film
      ? res.status(200).json(film)
      : res
          .status(400)
          .json({ msg: `Doesn't exists ${title} film`, code: res.statusCode });
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};
