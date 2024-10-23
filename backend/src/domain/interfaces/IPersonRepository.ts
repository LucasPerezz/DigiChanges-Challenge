import { Person } from "../entities/Person";
import { IFilterName } from "./IFilterName";

export interface IPersonRepository {
  getPeople(
    filters: IFilterName,
    options: { limit: number; offset: number }
  ): Promise<Person[]>;
  getPersonByName(name: string): Promise<Person | null>;
  syncPeopleData(people: Person[]): Promise<void>;
}
