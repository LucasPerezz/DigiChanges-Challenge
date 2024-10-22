import { Film } from "../entities/Film";
import { IFilterTitle } from "./IFilterTitle";

export interface IFilmRepository {
  getFilms(filters: IFilterTitle, options: { limit: number; offset: number }): Promise<any>;
  getFilmByTitle(title: string): Promise<Film | null>;
  syncFilmsData(films: Film[]): Promise<void>;
}
