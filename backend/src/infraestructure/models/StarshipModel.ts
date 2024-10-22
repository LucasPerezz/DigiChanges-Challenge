import mongoose, { Document, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface Starship extends Document {
  name: string;
  starship_model: string; 
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
};

const StarshipSchema: Schema = new Schema({
  name: { type: String },
  starship_model: { type: String }, 
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

StarshipSchema.plugin(mongoosePaginate);

const StarshipModel = mongoose.model<Starship, PaginateModel<Starship>>(
  "Starship",
  StarshipSchema
);

export { StarshipModel, Starship };
