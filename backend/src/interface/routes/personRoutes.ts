import { Router } from "express";
import { PersonController } from "../controllers/PersonController";
import { GetPeople } from "../../use-cases/people/GetPeople";
import { GetPersonByName } from "../../use-cases/people/GetPersonByName";
import { MongoPersonRepository } from "../../infraestructure/repositories/MongoPersonRepository";

const personRepository = new MongoPersonRepository;
const getPeopleUseCase = new GetPeople(personRepository);
const getPersonByNameUseCase = new GetPersonByName(personRepository);
const personController = new PersonController(getPeopleUseCase, getPersonByNameUseCase);

const personRoutes = Router();

personRoutes.get('/', (req, res) => personController.getPeople(req, res));

personRoutes.get('/:name', (req, res) => personController.getPersonByName(req, res));

export default personRoutes;

