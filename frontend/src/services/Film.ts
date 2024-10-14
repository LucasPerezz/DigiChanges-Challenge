class Film {
    constructor() {}

    async getFilms() {
        try {
            const response = await fetch(`${process.env.API_URL}/films/`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Error fetching data in People: ${error}`);
        }
    }

    async getFilmByName(title: string) {
        try {
            const response = await fetch(`${process.env.API_URL}/films/${title}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Error fetching data in People: ${error}`);
        }
    }
}

const filmsData = new Film();

export default filmsData;