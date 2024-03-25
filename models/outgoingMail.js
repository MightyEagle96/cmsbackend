import { Schema, model } from "mongoose";

const schema = new Schema({
  centre: { type: Schema.Types.ObjectId, ref: "Centre" },
  subject: String,
  content: String,
  dateSent: Date,
  readStatus: { type: Boolean, default: false },
});
schema.pre("save", function (next) {
  this.dateSent = new Date();
  next();
});
export default model("OutgoingMail", schema);
