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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilmByTitle = exports.getFilms = exports.syncFilmsDataToDB = void 0;
const film_model_1 = require("./film.model");
const syncFilmsDataToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = 1;
        let response = yield fetch(`https://swapi.dev/api/films/?page=${page}&format=json`);
        if (!response.ok) {
            throw new Error("Error fetching data");
        }
        while (response.ok) {
            const data = yield response.json();
            const films = data.results;
            for (const film of films) {
                const filmData = {
                    title: film.title,
                    episode_id: film.episode_id,
                    opening_crawl: film.opening_crawl,
                    director: film.director,
                    producer: film.producer,
                    release_date: film.release_date,
                    characters: film.characters,
                    planets: film.planets,
                    starships: film.starships,
                    vehicles: film.vehicles,
                    species: film.species,
                    created: film.created,
                    edited: film.edited,
                    url: film.url
                };
                const existingFilm = yield film_model_1.filmModel.findOne({ title: film.title });
                if (!existingFilm) {
                    const newFilm = new film_model_1.filmModel(filmData);
                    yield newFilm.save();
                    console.log(`Synchronized: ${film.title}`);
                }
                else {
                    console.log(`Film ${film.title} already exists in the database`);
                }
            }
            if (data.next) {
                page++;
                response = yield fetch(`https://swapi.dev/api/films/?page=${page}&format=json`);
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
exports.syncFilmsDataToDB = syncFilmsDataToDB;
const getFilms = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const films = yield film_model_1.filmModel.find();
        res.status(200).json(films);
    }
    catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
});
exports.getFilms = getFilms;
const getFilmByTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.params;
        const film = yield film_model_1.filmModel.findOne({ title: title });
        res.status(200).json(film);
    }
    catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
});
exports.getFilmByTitle = getFilmByTitle;
