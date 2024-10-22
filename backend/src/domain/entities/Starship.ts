export class Starship {
  constructor(
    public name: string,
    public starship_model: string,
    public manufacturer: string,
    public cost_in_credits: string,
    public length: string,
    public passengers: string,
    public cargo_capacity: string,
    public consumables: string,
    public hyperdrive_rating: string,
    public MGLT: string,
    public starship_class: string,
    public pilots: string[],
    public films: string[],
    public created: string,
    public edited: string,
    public url: string
  ) {}
}
