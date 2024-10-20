import mongoose, { Document, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const filmCollection = "Films";

interface Data extends Document {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  species: string[];
  vehicles: string[];
  created: string;
  edited: string;
  url: string;
}

const filmSchema: Schema = new Schema({
  title: { type: String },
  episode_id: { type: Number },
  opening_crawl: { type: String },
  director: { type: String },
  producer: { type: String },
  release_date: { type: Date },
  characters: { type: [String], default: [] },
  planets: { type: [String], default: [] },
  starships: { type: [String], default: [] },
  vehicles: { type: [String], default: [] },
  species: { type: [String], default: [] },
  created: { type: Date },
  edited: { type: Date },
  url: { type: String },
});

filmSchema.plugin(mongoosePaginate);

export const filmModel = mongoose.model<Data, PaginateModel<Data>>(
  filmCollection,
  filmSchema
);
