import { Person } from "../../domain/entities/Person";
import { IPersonRepository } from "../../domain/interfaces/IPersonRepository";

export class GetPersonByName {
  constructor(private personRepository: IPersonRepository) {}

  async execute(name: string): Promise<Person | null> {
    return await this.personRepository.getPersonByName(name);
  }
}
