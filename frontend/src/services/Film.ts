class Film {
  constructor() {}

  async getFilms(limit: number, page: number = 1, title: string = "") {
    try {
      const offset = (page - 1) * (limit ?? 0);
      const response = await fetch(`https://digichanges-challenge-backend.onrender.com/api/v1/films?limit=${limit}&offset=${offset}&title=${title}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching data in films: ${error}`);
    }
  }

  async getFilmByName(title: string) {
    try {
      const response = await fetch(`https://digichanges-challenge-backend.onrender.com/api/v1/films/${title}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching data in films: ${error}`);
    }
  }
}

const filmsData = new Film();

export default filmsData;
