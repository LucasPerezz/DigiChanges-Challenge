import mongoose, {Schema} from "mongoose";

interface Data {
    name: string,
    model: string,
    manufacturer: string,
    cost_in_credits: string,
    length: string,
    passengers: string,
    cargo_capacity: string,
    consumables: string,
    hyperdrive_rating: string,
    MGLT: string,
    starship_class: string,
    pilots: string[],
    films: string[],
    created: string,
    edited: string,
    url: string
};

const starshipCollection = "Starship";

const starshipSchema = new Schema({
    name: String,
    model: String,
    manufacturer: String,
    cost_in_credits: String,
    length: String,
    passengers: String,
    cargo_capacity: String,
    consumables: String,
    hyperdrive_rating: String,
    MGLT: String,
    starship_class: String,
    pilots: [String],
    films: [String],
    created: String,
    edited: String,
    url: String
});

const starshipModel = mongoose.model<Data>(starshipCollection, starshipSchema);

export default starshipModel;

