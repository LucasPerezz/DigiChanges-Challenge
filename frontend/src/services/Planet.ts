class Planet {
  constructor() {}

  async getPlanets(limit: number, page: number = 1, name: string = "") {
    try {
      const offset = (page - 1) * (limit ?? 0);
      const response = await fetch(
        `https://digichanges-challenge-backend.onrender.com/api/v1/planets?limit=${limit}&offset=${offset}&name=${name}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching data in Planet: ${error}`);
    }
  }

  async getPlanetsByName(name: string) {
    try {
      const response = await fetch(
        `https://digichanges-challenge-backend.onrender.com/api/v1/planets/${name}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching data in Planet: ${error}`);
    }
  }
}

const planetData = new Planet();

export default planetData;
