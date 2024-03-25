import express from "express";

import { sendMailPro } from "../controllers/mailController.js";
const mailRouter = express.Router();

//center
mailRouter.post("/send", sendMailPro);

export default mailRouter;
