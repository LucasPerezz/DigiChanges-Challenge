import mongoose, { Schema, Document } from "mongoose";

interface Data extends Document {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}

const planetCollection = "Planet";

const planetSchema: Schema = new Schema({
  name: { type: String },
  rotation_period: { type: String },
  orbital_period: { type: String },
  diameter: { type: String },
  climate: { type: String },
  gravity: { type: String },
  terrain: { type: String },
  surface_water: { type: String },
  population: { type: String },
  residents: { type: [String], default: [] },
  films: { type: [String], default: [] },
  created: { type: Date },
  edited: { type: Date },
  url: { type: String },
});

const planetModel = mongoose.model<Data>(planetCollection, planetSchema);

export default planetModel;
