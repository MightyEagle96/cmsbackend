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
    theme: "salted",
    product: { name: "JAMB FINANCE & ACCOUNTS", link: "https://jamb.gov.ng" },
  });

  const email = {
    body: {
      name: name,
      intro: content,
      outro,
      greeting: "Good Greetings, ",
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
async function main(emails, body, index) {
  try {
    const info = transporter.sendMail({
      from: {
        name: "JAMB FINANCE & ACCOUNTS DEPARTMENTS",
        address: process.env.SENDER_USER,
      },
      to: emails,
      subject: body.subject,
      text: body.content,
      // html: ,
      html: emailTemplate(body.name, body.content),
    });
    info
      .then(() => console.log(`Mail sent to ${emails}. -${index}`))
      .catch(`Could not send mail sent to ${emails}`);
  } catch (error) {
    console.log(new Error(error).message);
  }
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

export const sendMailVersion2 = (req, res) => {
  try {
    const recipients = req.body;
    for (let i = 80; i < 100; i++) {
      const recipient = recipients[i];

      const content = `This is to notify you that the sum of ${recipients[i].amountPaid} Naira has been paid to ${recipients[i].centrename}. \nAccount Number: ${recipients[i].accountNumber} ${recipients[i].bankName} Bank. \nRemitta Ref Number: ${recipients[i].remittaRefNumber}. \nDate Paid: ${recipients[i].datePaid}.`;

      const mailBody = {
        subject: `2024 UTME CBT CENTRE SERVICE CHARGE PAYMENT`,
        content,
        name: recipients[i].Name,
        //name: recipient.adminName.toUpperCase() || "",
      };
      if (recipient.email)
        main(recipient.email, mailBody, i + 1).catch(console.error);
    }

    res.send("Mail sent");
  } catch (error) {
    res.status(500).send(new Error(error).message);
  }
};

export const sendMailToSupervisors = (req, res) => {
  try {
    const recipients = req.body;

    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];

      const content = `This is to notify you that you are yet to refund the sum of N${recipients[
        i
      ].amountPaid.toLocaleString()} that was paid to you for the 2024 UTME exercise, for being absent for more than 50% of your examination days. Kindly refund the money and send a mail to shallyboy1@gmail.com with an attachment of proof of payment.`;

      const mailBody = {
        subject: `NOTICE TO REFUND`,
        content,
        name: recipients[i].name.toUpperCase(),
        //name: recipient.adminName.toUpperCase() || "",
      };
      if (recipient.email && recipient.email !== "NULL")
        //console.log(mailBody);
        main(recipient.email, mailBody, i + 1).catch(console.error);
    }

    res.send("Message sent");
  } catch (error) {
    res.status(500).send(new Error(error).message);
  }
};
