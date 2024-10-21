import { Request, Response } from "express";
import { filmModel } from "./film.model";

interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

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
      const films: Film[] = data.results.map((film: any) => ({
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
      }));

      const titles = films.map((film) => film.title);

      const existingFilms = await filmModel.find({ title: { $in: titles } });

      const newFilms = films.filter(
        (film) =>
          !existingFilms.some(
            (existingFilm) => existingFilm.title === film.title
          )
      );

      if (newFilms.length > 0) {
        await filmModel.insertMany(newFilms);
        console.log(`Synchronized ${newFilms.length} films`);
      } else {
        console.log(`No new films to synchronize`);
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

export const getFilms = async (req: Request, res: Response) => {
  try {
    const { limit, offset, title } = req.query;

    const options = {
      offset: Number(offset) || 0,
      limit: Number(limit) || 10,
    };

    const filters: any = {};

    if (title) {
      filters.title = { $regex: title, $options: "i" }; // case insensitive -> ignora mayusculas y minusculas
    }

    const films = await filmModel.paginate(filters, options);

    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ message: `Error fetching data` });
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
