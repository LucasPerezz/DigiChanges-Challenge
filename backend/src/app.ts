import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
import cors from 'cors';
import mongoose from 'mongoose';
import peopleRouter from './entities/people/people.routes';
import { syncData } from './cron';
import filmRouter from './entities/film/film.routes';
import starshipRouter from './entities/starship/starship.routes';
import planetsRouter from './entities/planet/planet.routes';


dotenv.config();
const app: Express = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api/v1/people', peopleRouter);
app.use('/api/v1/films', filmRouter);
app.use('/api/v1/starships', starshipRouter);
app.use('/api/v1/planets', planetsRouter);

syncData();

cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});

app.get("/", (_request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 



app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});



const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017/syncdb';

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));