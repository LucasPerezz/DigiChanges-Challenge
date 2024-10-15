import mongoose, { Schema } from "mongoose";

interface Data {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

const starshipCollection = "Starship";

const starshipSchema: Schema = new Schema({
  name: { type: String },
  model: { type: String },
  manufacturer: { type: String },
  cost_in_credits: { type: String },
  length: { type: String },
  passengers: { type: String },
  cargo_capacity: { type: String },
  consumables: { type: String },
  hyperdrive_rating: { type: String },
  MGLT: { type: String },
  starship_class: { type: String },
  pilots: { type: [String], default: [] },
  films: { type: [String], default: [] },
  created: { type: String },
  edited: { type: String },
  url: { type: String },
});

const starshipModel = mongoose.model<Data>(starshipCollection, starshipSchema);

export default starshipModel;
