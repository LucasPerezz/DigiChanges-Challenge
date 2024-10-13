import cron from 'node-cron';
import { syncPeopleDataToDB } from './entities/people/people.controller';
import { syncFilmsDataToDB } from './entities/film/film.controller';
import { syncPlanetsDataToDB } from './entities/planet/planet.controller';
import { syncStarshipDataToDB } from './entities/starship/starship.controller';

export const syncData = () => {
    cron.schedule('* * * * *', async () => {
        await syncPeopleDataToDB();
        await syncFilmsDataToDB();
        await syncPlanetsDataToDB();
        await syncStarshipDataToDB();
    })
}