/* eslint-disable no-undef */
import outgoingMail from "../models/outgoingMail.js";
import nodemailer from "nodemailer";
import MailGen from "mailgen";
import { writeFileSync } from "fs";

export const sendMail = async (req, res) => {
  await outgoingMail.create(req.body);

  res.send("Mail Delivered");
};

export const outgoneMails = async (req, res) => {
  const mails = await outgoingMail.find().populate("centre");

  res.send(mails);
};

const emailTemplate = (name, content, outro) => {
  const mailGenerator = new MailGen({
    theme: "default",
    product: { name: "JAMB ITS", link: "https://jamb.gov.ng" },
  });

  const email = {
    body: {
      name: name,
      intro: content,
      outro,
      greeting: "Good Greetings",
      signature: "Thanks",
    },
  };

  const emailBody = mailGenerator.generate(email);

  return emailBody;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.SENDER_USER,
    pass: process.env.SENDER_PASSWORD,
  },
});
async function main(emails, body) {
  const info = transporter.sendMail({
    from: { name: "JAMB ITS", address: process.env.SENDER_USER },
    to: emails,
    subject: body.subject,
    text: body.content,
    // html: ,
    html: emailTemplate(body.name, body.content),
  });
  info.then(() => console.log("Message sent")).catch("Could not send message");
}

const centreVariable = "{centre}";
export const sendMailPro = (req, res) => {
  try {
    // const emails = [
    //   { email: "mightyeaglecorp@gmail.com", name: "Dubem" },
    //   { email: "dubemeagleikechukwu@gmail.com", name: "Eagle" },
    //   { email: "dubzy1sogeagle@gmail.com", name: "Mighty Eagle" },
    // ];
    const recipients = req.body.recipients;
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];

      const content = req.body.mailData.content.replace(
        centreVariable,
        recipient.centreName.toUpperCase() || ""
      );

      const mailBody = {
        subject: req.body.mailData.subject,
        content,
        name: recipient.adminName.toUpperCase() || "",
      };

      main(recipient.adminEmail, mailBody).catch(console.error);
    }

    res.send("Mail sent");
  } catch (error) {
    res.status(500).send(new Error(error).message);
  }
};
