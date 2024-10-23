import cron from "node-cron";
import { SyncFilmsData } from "../../use-cases/films/SyncFilmsData";
import { MongoFilmRepository } from "../repositories/MongoFilmRepository";
import { SyncPeopleData } from "../../use-cases/people/SyncPeopleData";
import { MongoPersonRepository } from "../repositories/MongoPersonRepository";
import { SyncPlanetsData } from "../../use-cases/planets/SyncPlanetsData";
import { SyncStarshipsData } from "../../use-cases/starships/SyncStarshipsData";
import { MongoPlanetRepository } from "../repositories/MongoPlanetRepository";
import { MongoStarshipRepository } from "../repositories/MongoStarshipRepository";

//instanciar dependencias
const filmRepository = new MongoFilmRepository();
const syncFilmDataUseCase = new SyncFilmsData(filmRepository);
const starshipRepository = new MongoStarshipRepository();
const syncStarshipDataUseCase = new SyncStarshipsData(starshipRepository);
const planetRepository = new MongoPlanetRepository();
const syncPlanetDataUseCase = new SyncPlanetsData(planetRepository);
const personRepository = new MongoPersonRepository();
const syncPeopleDataUseCase = new SyncPeopleData(personRepository);

cron.schedule("* * * * *", async () => {
  try {
    await syncFilmDataUseCase.execute();
    await syncPeopleDataUseCase.execute();
    await syncPlanetDataUseCase.execute();
    await syncStarshipDataUseCase.execute();
    console.log("Data synced successfully");
  } catch (error) {
    console.error("Error syncing films data:", error);
  }
});
