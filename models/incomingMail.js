import { Schema, model } from "mongoose";

const schema = new Schema({
  centre: { type: Schema.Types.ObjectId, ref: "centre" },
  subject: String,
  content: String,
  dateSent: Date,
  readStatus: { type: Boolean, default: false },
  replyingToEmail: { type: Schema.Types.ObjectId, ref: "OutgoingMail" },
});

schema.pre("save", function (next) {
  this.dateSent = new Date();
  next();
});
export default model("IncomingMail", schema);
