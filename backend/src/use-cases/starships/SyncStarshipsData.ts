import { Starship } from "../../domain/entities/Starship";
import { IStarshipRepository } from "../../domain/interfaces/IStarshipRepository";

export class SyncStarshipsData {
  private readonly starshipRepository: IStarshipRepository;

  constructor(starshipRepository: IStarshipRepository) {
    this.starshipRepository = starshipRepository;
  }

  async execute() {
    try {
      let page = 1;
      let response = await fetch(
        `https://swapi.dev/api/starships/?page=${page}&format=json`
      );

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      while (response.ok) {
        const data = await response.json();
        const starships = data.results.map((starship: Starship) => ({
          name: starship.name,
          starship_model: starship.starship_model,
          manufacturer: starship.manufacturer,
          cost_in_credits: starship.cost_in_credits,
          length: starship.length,
          passengers: starship.passengers,
          cargo_capacity: starship.cargo_capacity,
          consumables: starship.consumables,
          hyperdrive_rating: starship.hyperdrive_rating,
          MGLT: starship.MGLT,
          starship_class: starship.starship_class,
          pilots: starship.pilots,
          films: starship.films,
          created: starship.created,
          edited: starship.edited,
          url: starship.url,
        }));

        await this.starshipRepository.syncStarshipsData(starships);

        if (data.next) {
            page++;
            response = await fetch(`https://swapi.dev/api/starships/?page=${page}&format=json`);
        } else {
            break;
        }



      }
    } catch (error) {
      console.error("Error synchronizing data:", error);
    }
  }
}
