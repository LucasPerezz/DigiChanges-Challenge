import { Person } from "../entities/Person";

export interface IPersonRepository {
  getPeople(filters: any, options: {limit: number; offset: number}): Promise<Person[]>;
  getPersonByName(name: string): Promise<Person | null>;
  syncPeopleData(people: Person[]): Promise<void>;
}
