import { Person } from "../../domain/entities/Person";
import { IFilterName } from "../../domain/interfaces/IFilterName";
import { IPersonRepository } from "../../domain/interfaces/IPersonRepository";

export class GetPeople {
  constructor(private personRepository: IPersonRepository) {}

  async execute(
    filters: IFilterName,
    options: { limit: number; offset: number }
  ): Promise<Person[]> {
    return await this.personRepository.getPeople(filters, options);
  }
}
