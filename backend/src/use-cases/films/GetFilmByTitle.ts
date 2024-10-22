import { Film } from "../../domain/entities/Film";
import { IFilmRepository } from "../../domain/interfaces/IFilmRepository";

export class GetFilmByTitle {
  constructor(private filmRepository: IFilmRepository) {}

  async execute(title: string): Promise<Film | null> {
    return await this.filmRepository.getFilmByTitle(title);
  }
}
