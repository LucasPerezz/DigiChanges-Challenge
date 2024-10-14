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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const mongoose_1 = __importDefault(require("mongoose"));
describe('GET /people/', () => {
    it('should fetch all people', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get('/api/v1/people');
        expect(response.status).toBe(200);
    }));
});
describe('GET /people/:name', () => {
    it('should fetch character by name', () => __awaiter(void 0, void 0, void 0, function* () {
        const characterName = "Luke Skywalker";
        const response = yield (0, supertest_1.default)(app_1.app).get(`/api/v1/people/${characterName}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', characterName);
    }));
});
describe('GET /starships/', () => {
    it('should fetch all starships', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get('/api/v1/starships/');
        expect(response.status).toBe(200);
    }));
});
describe('GET /starships/:name', () => {
    it('should fetch starship by name', () => __awaiter(void 0, void 0, void 0, function* () {
        const starship = "Death Star";
        const response = yield (0, supertest_1.default)(app_1.app).get(`/api/v1/starships/${starship}`);
        expect(response.status).toBe(200);
    }));
});
describe('GET /planets/', () => {
    it('should fetch all planets', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get('/api/v1/planets/');
        expect(response.status).toBe(200);
    }));
});
describe('GET /planets/:name', () => {
    it('should fetch planet by name', () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = "Tatooine";
        const response = yield (0, supertest_1.default)(app_1.app).get(`/api/v1/planets/${planet}`);
        expect(response.status).toBe(200);
    }));
});
describe('GET /films/', () => {
    it('should fetch all films', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get('/api/v1/films/');
        expect(response.status).toBe(200);
    }));
});
describe('GET /films/:title', () => {
    it('should fetch film by title', () => __awaiter(void 0, void 0, void 0, function* () {
        const film = "A New Hope";
        const response = yield (0, supertest_1.default)(app_1.app).get(`/api/v1/films/${film}`);
        expect(response.status).toBe(200);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    app_1.server.close();
}));
