import { Film } from "../../domain/entities/Film";
import { IFilmRepository } from "../../domain/interfaces/IFilmRepository";
import { FilmModel } from "../models/FilmModel";
import { PaginateResult } from "mongoose";

export class MongoFilmRepository implements IFilmRepository {
  async getFilms(
    filters: any,
    options: { limit: number; offset: number }
  ): Promise<Film[]> {
    const result: PaginateResult<Film> = await FilmModel.paginate(
      filters,
      options
    );
    return result.docs;
  }

  async getFilmByTitle(title: string): Promise<Film | null> {
    const film = await FilmModel.findOne({ title: title }).lean();
    return film as Film | null;
  }

  async syncFilmsData(films: Film[]) {
    const titles = films.map((film) => film.title);

    const existingFilms = await FilmModel.find({ title: { $in: titles } });

    const newFilms = films.filter(
      (film) =>
        !existingFilms.some((existingFilm) => existingFilm.title === film.title)
    );

    if (newFilms.length > 0) {
      await FilmModel.insertMany(newFilms);
      console.log(`Synchronized ${newFilms.length} films`);
    } else {
      console.log(`No new films to synchronize`);
    }
  }
}
