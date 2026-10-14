import mongoose , {Schema, Document} from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String,  },
  password: { type: String,  },
});

export const user = mongoose.model<IUser>("user", userSchema);

export default user;