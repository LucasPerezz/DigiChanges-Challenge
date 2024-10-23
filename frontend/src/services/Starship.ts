class Starship {
  constructor() {}

  async getStarships(limit: number, page: number = 1, name: string = "") {
    try {
      const offset = (page - 1) * (limit ?? 0);
      const response = await fetch(`https://digichanges-challenge-backend.onrender.com/api/v1/starships?limit=${limit}&offset=${offset}&name=${name}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching data in Starship: ${error}`);
    }
  }

  async getStarshipByName(name: string) {
    try {
      const response = await fetch(`https://digichanges-challenge-backend.onrender.com/api/v1/starships/${name}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching data in Starship: ${error}`);
    }
  }
}

const starshipData = new Starship();

export default starshipData;
