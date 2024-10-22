import mongoose, { Document, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface Person extends Document {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

const PersonSchema: Schema = new Schema({
  name: { type: String },
  height: { type: String },
  mass: { type: String },
  hair_color: { type: String },
  skin_color: { type: String },
  eye_color: { type: String },
  birth_year: { type: String },
  gender: { type: String },
  homeworld: { type: String },
  films: { type: [String], default: [] },
  species: { type: [String], default: [] },
  vehicles: { type: [String], default: [] },
  starships: { type: [String], default: [] },
  created: { type: String },
  edited: { type: String },
  url: { type: String },
});

PersonSchema.plugin(mongoosePaginate);

const PersonModel = mongoose.model<Person, PaginateModel<Person>>("Person", PersonSchema);

export { PersonModel, Person };
