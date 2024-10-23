import { Request, Response } from "express";
import { GetFilms } from "../../use-cases/films/GetFilms";
import { GetFilmByTitle } from "../../use-cases/films/GetFilmByTitle";
import { IFilterTitle } from "../../domain/interfaces/IFilterTitle";

export class FilmController {
  private readonly getFilmsUseCase: GetFilms;
  private readonly getFilmByTitleUseCase: GetFilmByTitle;

  constructor(
    getFilmsUseCase: GetFilms,
    getFilmByTitleUseCase: GetFilmByTitle
  ) {
    this.getFilmsUseCase = getFilmsUseCase;
    this.getFilmByTitleUseCase = getFilmByTitleUseCase;
  }

  async getFilms(req: Request, res: Response) {
    try {
      const { limit, offset, title } = req.query;

      const options = {
        offset: Number(offset) || 0,
        limit: Number(limit) || 10,
      };

      const filters: IFilterTitle = {};

      if (typeof title === "string") {
        filters.title = { $regex: title, $options: "i" };
      }

      const films = await this.getFilmsUseCase.execute(filters, options);
      res.status(200).json(films);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  async getFilmsByName(req: Request, res: Response) {
    try {
      const { title } = req.params;

      const film = await this.getFilmByTitleUseCase.execute(title);
      if (film) {
        res.status(200).json(film);
      } else {
        res
          .status(404)
          .json({ message: `Film with title "${title}" not found` });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}
