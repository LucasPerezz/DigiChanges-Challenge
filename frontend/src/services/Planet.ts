class Planet {
  constructor() {}

  async getPlanets() {
    try {
      const response = await fetch(`https://digichanges-challenge-backend.onrender.com/api/v1/planets`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching data in Planet: ${error}`);
    }
  }

  async getPlanetsByName(name: string) {
    try {
      const response = await fetch(`https://digichanges-challenge-backend.onrender.com/api/v1/planets/${name}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching data in Planet: ${error}`);
    }
  }
}

const planetData = new Planet();

export default planetData;
