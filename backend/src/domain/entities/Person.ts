export class Person {
  constructor(
    public name: string,
    public height: string,
    public mass: string,
    public hair_color: string,
    public skin_color: string,
    public eye_color: string,
    public birth_year: string,
    public gender: string,
    public homeworld: string,
    public films: string[],
    public species: string[],
    public vehicles: string[],
    public starships: string[],
    public created: Date,
    public edited: Date,
    public url: string
  ) {}
}
