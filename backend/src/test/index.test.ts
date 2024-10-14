import request from 'supertest';
import {app, server} from '../app';
import mongoose from 'mongoose';


describe('GET /people/', () => {
    it('should fetch all people', async () => {
        const response = await request(app).get('/api/v1/people');
        expect(response.status).toBe(200);
    });
});

describe('GET /people/:name', () => {
    it('should fetch character by name', async () => {
        const characterName = "Luke Skywalker";
        const response = await request(app).get(`/api/v1/people/${characterName}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', characterName);
    });
});

describe('GET /starships/', () => {
    it('should fetch all starships', async () => {
        const response = await request(app).get('/api/v1/starships/');
        expect(response.status).toBe(200);
    });
});

describe('GET /starships/:name', () => {
    it('should fetch starship by name', async () => {
        const starship = "Death Star"
        const response = await request(app).get(`/api/v1/starships/${starship}`);
        expect(response.status).toBe(200);
    });
});

describe('GET /planets/', () => {
    it('should fetch all planets', async () => {
        const response = await request(app).get('/api/v1/planets/');
        expect(response.status).toBe(200);
    });
});

describe('GET /planets/:name', () => {
    it('should fetch planet by name', async () => {
        const planet = "Tatooine"
        const response = await request(app).get(`/api/v1/planets/${planet}`);
        expect(response.status).toBe(200);
    });
});


describe('GET /films/', () => {
    it('should fetch all films', async () => {
        const response = await request(app).get('/api/v1/films/');
        expect(response.status).toBe(200);
    });
});

describe('GET /films/:title', () => {
    it('should fetch film by title', async () => {
        const film = "A New Hope"
        const response = await request(app).get(`/api/v1/films/${film}`);
        expect(response.status).toBe(200);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});