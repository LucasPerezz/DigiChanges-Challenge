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
exports.getStarshipByName = exports.getStarships = exports.syncStarshipDataToDB = void 0;
const starship_model_1 = __importDefault(require("./starship.model"));
const syncStarshipDataToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = 1;
        let response = yield fetch(`https://swapi.dev/api/starships/?page=${page}&format=json`);
        if (!response.ok) {
            throw new Error("Error fetching data");
        }
        while (response.ok) {
            const data = yield response.json();
            const starships = data.results;
            for (const starship of starships) {
                const starshipData = {
                    name: starship.name,
                    model: starship.model,
                    manufacturer: starship.manufacturer,
                    cost_in_credits: starship.cost_in_credits,
                    length: starship.length,
                    max_atmosphering_speed: starship.max_atmosphering_speed,
                    crew: starship.crew,
                    passengers: starship.passengers,
                    cargo_capacity: starship.cargo_capacity,
                    consumables: starship.consumables,
                    hyperdrive_rating: starship.hyperdrive_rating,
                    MGLT: starship.MGLT,
                    starship_class: starship.starship_class,
                    pilots: starship.pilots,
                    films: starship.films,
                    created: starship.created,
                    edited: starship.edited,
                    url: starship.url,
                };
                const existingStarship = yield starship_model_1.default.findOne({
                    name: starship.name,
                });
                if (!existingStarship) {
                    const newStarship = new starship_model_1.default(starshipData);
                    yield newStarship.save();
                    console.log(`Synchronized: ${starship.name}`);
                }
                else {
                    console.log(`${starship.name} already exists in the database`);
                }
            }
            if (data.next) {
                page++;
                response = yield fetch(`https://swapi.dev/api/starships/?page=${page}&format=json`);
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
exports.syncStarshipDataToDB = syncStarshipDataToDB;
const getStarships = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const starships = yield starship_model_1.default.find();
        res.status(200).json(starships);
    }
    catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
});
exports.getStarships = getStarships;
const getStarshipByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const starship = yield starship_model_1.default.findOne({ name: name });
        starship
            ? res.status(200).json(starship)
            : res.status(400).json({
                msg: `Doesn't exists ${name} starship`,
                code: res.statusCode,
            });
    }
    catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
});
exports.getStarshipByName = getStarshipByName;
