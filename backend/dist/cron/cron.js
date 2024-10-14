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
exports.syncData = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const people_controller_1 = require("../entities/people/people.controller");
const film_controller_1 = require("../entities/film/film.controller");
const planet_controller_1 = require("../entities/planet/planet.controller");
const starship_controller_1 = require("../entities/starship/starship.controller");
const syncData = () => {
    node_cron_1.default.schedule('0 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, people_controller_1.syncPeopleDataToDB)();
        yield (0, film_controller_1.syncFilmsDataToDB)();
        yield (0, planet_controller_1.syncPlanetsDataToDB)();
        yield (0, starship_controller_1.syncStarshipDataToDB)();
    }));
};
exports.syncData = syncData;
