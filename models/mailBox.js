import { Schema, model } from "mongoose";

const schema = new Schema({
  centre: { type: Schema.Types.ObjectId, ref: "centre" },
  incomingMails: [
    {
      mailHeader: String,
      content: String,
      dateSent: Date,
      readStatus: { type: Boolean, default: false },
    },
  ], // Mailbox for
  outgoingMails: [
    {
      mailHeader: String,
      content: String,
      dateSent: Date,
      readStatus: { type: Boolean, default: false },
    },
  ], // Mailbox for
});

export default model("MailBox", schema);
