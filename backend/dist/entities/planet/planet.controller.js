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
exports.getPlanetsById = exports.getPlanets = exports.syncPlanetsDataToDB = void 0;
const planet_model_1 = __importDefault(require("./planet.model"));
const syncPlanetsDataToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = 1;
        let response = yield fetch(`https://swapi.dev/api/planets/?page=${page}&format=json`);
        if (!response.ok) {
            throw new Error("Error fetching planets data");
        }
        while (response.ok) {
            const data = yield response.json();
            const planets = data.results;
            for (const planet of planets) {
                const planetData = {
                    name: planet.name,
                    rotation_period: planet.rotation_period,
                    orbital_period: planet.orbital_period,
                    diameter: planet.diameter,
                    climate: planet.climate,
                    gravity: planet.gravity,
                    terrain: planet.terrain,
                    surface_water: planet.surface_water,
                    population: planet.population,
                    residents: planet.residents,
                    films: planet.films,
                    created: planet.created,
                    edited: planet.edited,
                    url: planet.url
                };
                const existingPlanet = yield planet_model_1.default.findOne({ name: planet.name });
                if (!existingPlanet) {
                    const newPlanet = new planet_model_1.default(planetData);
                    yield newPlanet.save();
                    console.log(`Synchronized: ${planet.name}`);
                }
                else {
                    console.log(`${planet.name} already exists in the database`);
                }
            }
            if (data.next) {
                page++;
                response = yield fetch(`https://swapi.dev/api/planets/?page=${page}&format=json`);
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
exports.syncPlanetsDataToDB = syncPlanetsDataToDB;
const getPlanets = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planets = yield planet_model_1.default.find();
        res.status(200).json(planets);
    }
    catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
});
exports.getPlanets = getPlanets;
const getPlanetsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const planet = yield planet_model_1.default.findOne({ name: name });
        res.status(200).json(planet);
    }
    catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
});
exports.getPlanetsById = getPlanetsById;
