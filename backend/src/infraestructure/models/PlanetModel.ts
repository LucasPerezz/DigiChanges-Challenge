import mongoose, { Document, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface Planet extends Document {
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

const PlanetSchema: Schema = new Schema({
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

PlanetSchema.plugin(mongoosePaginate);

const PlanetModel = mongoose.model<Planet, PaginateModel<Planet>>(
  "Planet",
  PlanetSchema
);

export { PlanetModel, Planet };
