import { PaginateResult } from "mongoose";
import { Starship } from "../../domain/entities/Starship";
import { IStarshipRepository } from "../../domain/interfaces/IStarshipRepository";
import { StarshipModel } from "../models/StarshipModel";
import { IFilterName } from "../../domain/interfaces/IFilterName";

export class MongoStarshipRepository implements IStarshipRepository {
  async getStarships(
    filters: IFilterName,
    options: { limit: number; offset: number }
  ): Promise<Starship[]> {
    const result: PaginateResult<Starship> = await StarshipModel.paginate(
      filters,
      options
    );
    return result.docs;
  }

  async getStarshipByName(name: string): Promise<Starship | null> {
    const starship = await StarshipModel.findOne({ name: name }).lean();
    return starship as Starship | null;
  }

  async syncStarshipsData(starships: Starship[]) {
    const names = starships.map((starship) => starship.name);

    const existingStarships = await StarshipModel.find({
      name: { $in: names },
    });

    const newStarships = starships.filter(
      (starship) =>
        !existingStarships.some(
          (existingStarship) => existingStarship.name === starship.name
        )
    );

    if (newStarships.length > 0) {
      await StarshipModel.insertMany(newStarships);
      console.log(`Synchronized ${newStarships.length} starships`);
    } else {
      console.log(`No new films to synchronize`);
    }
  }
}
