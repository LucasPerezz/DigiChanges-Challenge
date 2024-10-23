import { Film } from "../../domain/entities/Film";
import { IFilmRepository } from "../../domain/interfaces/IFilmRepository";

export class SyncFilmsData {
  private readonly filmRepository: IFilmRepository;

  constructor(filmRepository: IFilmRepository) {
    this.filmRepository = filmRepository;
  }

  async execute(): Promise<void> {
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
        const films = data.results.map((film: Film) => ({
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

        await this.filmRepository.syncFilmsData(films);

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
  }
}
