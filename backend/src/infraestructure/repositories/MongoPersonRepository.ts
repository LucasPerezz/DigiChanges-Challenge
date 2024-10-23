import { PaginateResult } from "mongoose";
import { Person } from "../../domain/entities/Person";
import { IPersonRepository } from "../../domain/interfaces/IPersonRepository";
import { PersonModel } from "../models/PersonModel";
import { IFilterName } from "../../domain/interfaces/IFilterName";

export class MongoPersonRepository implements IPersonRepository {
  async getPeople(
    filters: IFilterName,
    options: { limit: number; offset: number }
  ): Promise<Person[]> {
    const result: PaginateResult<Person> = await PersonModel.paginate(
      filters,
      options
    );
    return result.docs;
  }

  async getPersonByName(name: string): Promise<Person | null> {
    const person = await PersonModel.findOne({ name: name }).lean();
    return person as Person | null;
  }

  async syncPeopleData(people: Person[]): Promise<void> {
    const names = people.map((person) => person.name);

    const existingPeople = await PersonModel.find({ name: { $in: names } });

    const newPeople = people.filter(
      (person) =>
        !existingPeople.some(
          (existingPerson) => existingPerson.name === person.name
        )
    );

    if (newPeople.length > 0) {
      await PersonModel.insertMany(newPeople);
      console.log(`Synchronized ${newPeople.length} people`);
    } else {
      console.log(`No new films to synchronize`);
    }
  }
}
