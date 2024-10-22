import { Person } from "../../domain/entities/Person";
import { IPersonRepository } from "../../domain/interfaces/IPersonRepository";

export class SyncPeopleData {
  private readonly personRepository: IPersonRepository;

  constructor(personRepository: IPersonRepository) {
    this.personRepository = personRepository;
  }

  async execute() {
    try {
      let page = 1;
      let response = await fetch(
        `https://swapi.dev/api/people/?page=${page}&format=json`
      );

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      while (response.ok) {
        const data = await response.json();
        const people: Person[] = data.results.map((person: Person) => ({
          name: person.name,
          height: person.height,
          mass: person.mass,
          hair_color: person.hair_color,
          skin_color: person.skin_color,
          eye_color: person.eye_color,
          birth_year: person.birth_year,
          gender: person.gender,
          homeworld: person.homeworld,
          films: person.films,
          species: person.species,
          vehicles: person.vehicles,
          starships: person.starships,
          created: person.created,
          edited: person.edited,
          url: person.url,
        }));

        await this.personRepository.syncPeopleData(people);

        if (data.next) {
          page++;
          response = await fetch(
            `https://swapi.dev/api/people/?page=${page}&format=json`
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
