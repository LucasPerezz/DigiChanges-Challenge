import { Person } from "../../domain/entities/Person";
import { IPersonRepository } from "../../domain/interfaces/IPersonRepository";

export class GetPeople {
  constructor(private personRepository: IPersonRepository) {}

  async execute(filters: any, options: {limit: number; offset: number}): Promise<Person[]> {
    return await this.personRepository.getPeople(filters, options);
  }
}
