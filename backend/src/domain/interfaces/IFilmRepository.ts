import { Film } from "../entities/Film";

export interface IFilmRepository {
  getFilms(filters: any, options: { limit: number; offset: number }): Promise<any>;
  getFilmByTitle(title: string): Promise<Film | null>;
  syncFilmsData(films: Film[]): Promise<void>;
}
