import { Schema, model } from "mongoose";

const schema = new Schema({
  centreName: { type: String, lowercase: true },
  referenceNumber: { type: String, lowercase: true },
  state: { type: String, lowercase: true },
  adminName:{type:String, lowercase:true},
  adminEmail: { type: String, lowercase: true },
  adminPhone: { type: String, lowercase: true },
});

export default model("Centre", schema);
