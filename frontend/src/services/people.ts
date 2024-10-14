class People {
    constructor() {}

    async getPeople() {
        try {
            const response = await fetch(`${process.env.API_URL}/people`);
            const data = await response.json();
            return data
        } catch (error) {
            throw new Error(`Error fetching data in People: ${error}`);
        }
    }

    async getPeopleById(name: string) {
        try {
            const response = await fetch(`${process.env.API_URL}/${name}`);
            const data = await response.json();
            console.log('get', data);
            return data;
        } catch (error) {
            throw new Error(`Error fetching data in People: ${error}`);
        }
    }

}

const peopleData = new People();

export default peopleData;