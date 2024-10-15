"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPeopleByName = exports.getPeople = exports.syncPeopleDataToDB = void 0;
const people_model_1 = __importDefault(require("./people.model"));
const syncPeopleDataToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = 1;
        let response = yield fetch(`https://swapi.dev/api/people/?page=${page}&format=json`);
        if (!response.ok) {
            throw new Error("Error fetching data");
        }
        while (response.ok) {
            const data = yield response.json();
            const people = data.results;
            for (const person of people) {
                const personData = {
                    name: person.name,
                    height: person.height,
                    mass: person.mass,
                    hair_color: person.hair_color,
                    skin_color: person.skin_color,
                    eye_color: person.eye_color,
                    birth_year: person.birth_year,
                    gender: person.gender,
                    homeworld: person.homeworld,
                    films: person.films,
                    species: person.species,
                    vehicles: person.vehicles,
                    starships: person.starships,
                    created: person.created,
                    edited: person.edited,
                    url: person.url,
                };
                const existingPerson = yield people_model_1.default.findOne({ name: person.name });
                if (!existingPerson) {
                    const newPerson = new people_model_1.default(personData);
                    yield newPerson.save();
                    console.log(`Synchronized: ${person.name}`);
                }
                else {
                    console.log(`${person.name} already exists in the database`);
                }
            }
            if (data.next) {
                page++;
                response = yield fetch(`https://swapi.dev/api/people/?page=${page}&format=json`);
            }
            else {
                break;
            }
        }
    }
    catch (error) {
        console.error("Error synchronizing data:", error);
    }
});
exports.syncPeopleDataToDB = syncPeopleDataToDB;
const getPeople = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const people = yield people_model_1.default.find();
        res.status(200).json(people);
    }
    catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
});
exports.getPeople = getPeople;
const getPeopleByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const people = yield people_model_1.default.findOne({ name: name });
        people
            ? res.status(200).json(people)
            : res.status(400).json({
                msg: `Doesn't exists ${name} character`,
                code: res.statusCode,
            });
    }
    catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
});
exports.getPeopleByName = getPeopleByName;
