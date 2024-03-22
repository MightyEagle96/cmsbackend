import centreModel from "../models/centreModel.js";

export const createCentre = async (req, res) => {
  const centre = await centreModel.findOne({
    referenceNumber: req.body.referenceNumber,
  });

  if (centre)
    return res
      .status(409)
      .send("A centre with this reference number already exists");

  await centreModel.create(req.body);

  res.send("Successfully created a new centre");
};

export const loginCentre = async (req, res) => {
  const centre = await centreModel.findOne(req.body);

  if (!centre) return res.status(400).send("Invalid centre reference number");

  res.send(centre);
};

export const centreList = async (req, res) => {
  const centres = await centreModel.find();
  res.send(centres);
};
