import { Film } from "../../domain/entities/Film";
import { IFilmRepository } from "../../domain/interfaces/IFilmRepository";
import { IFilterTitle } from "../../domain/interfaces/IFilterTitle";

export class GetFilms {
  constructor(private filmRepository: IFilmRepository) {}

  async execute(filters: IFilterTitle, options: { limit: number; offset: number }): Promise<Film[]> {
    return await this.filmRepository.getFilms(filters, options);
  }
}
