import { Schema, model } from "mongoose";

const schema = new Schema({
  username: String,
  password: String,
});

export default model("Account", schema);
