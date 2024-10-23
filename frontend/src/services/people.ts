class People {
  constructor() {}

  async getPeople(limit: number, page: number = 1, name: string = "") {
    try {
      const offset = (page - 1) * (limit ?? 0);
      const response = await fetch(
        `https://digichanges-challenge-backend.onrender.com/api/v1/people?limit=${limit}&offset=${offset}&name=${name}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching data in People: ${error}`);
    }
  }

  async getPeopleById(name: string) {
    try {
      const response = await fetch(
        `https://digichanges-challenge-backend.onrender.com/api/v1/people/${name}`
      );
      const data = await response.json();
      console.log("get", data);
      return data;
    } catch (error) {
      throw new Error(`Error fetching data in People: ${error}`);
    }
  }
}

const peopleData = new People();

export default peopleData;
