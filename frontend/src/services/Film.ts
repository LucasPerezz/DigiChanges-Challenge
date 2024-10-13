class Film {
    constructor() {}

    async getFilms() {
        try {
            const response = await fetch("http://localhost:3000/api/v1/films/");
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Error fetching data in People: ${error}`);
        }
    }

    async getFilmByName(title: string) {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/films/${title}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Error fetching data in People: ${error}`);
        }
    }
}

const filmsData = new Film();

export default filmsData;