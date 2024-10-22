import { Film } from "../../domain/entities/Film";
import { IFilmRepository } from "../../domain/interfaces/IFilmRepository";

export class GetFilms {
  constructor(private filmRepository: IFilmRepository) {}

  async execute(filters: any, options: { limit: number; offset: number }): Promise<Film[]> {
    return await this.filmRepository.getFilms(filters, options);
  }
}
