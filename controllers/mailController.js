import outgoingMail from "../models/outgoingMail.js";

export const sendMail = async (req, res) => {
  await outgoingMail.create(req.body);

  res.send("Mail Delivered");
};

export const outgoneMails = async (req, res) => {
  const mails = await outgoingMail.find().populate("centre");

  res.send(mails);
};
