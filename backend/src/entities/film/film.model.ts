import mongoose, { Schema } from "mongoose";

const filmCollection = "Films";

interface Data {
    title: string,
    episode_id: number,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string,
    characters: string[],
    planets: string[],
    species: string[],
    vehicles: string[],
    created: string,
    edited: string,
    url: string
}

const filmSchema = new Schema({
    title: String,
    episode_id: Number,
    opening_crawl: String,
    director: String,
    producer: String,
    release_date: Date,
    characters: [String],
    planets: [String],
    starships: [String],
    vehicles: [String],
    species: [String],
    created: Date,
    edited: Date,
    url: String
});


export const filmModel = mongoose.model<Data>(filmCollection, filmSchema);

