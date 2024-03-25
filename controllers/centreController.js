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

export const createBulkCentres = async (req, res) => {
  const centres = req.body;

  const existingRefNumbers = [];
  for (let i = 0; i < centres.length; i++) {
    let centre = centres[i];

    const existingCentre = await centreModel.findOne({
      referenceNumber: centre.referenceNumber,
    });

    if (!existingCentre) {
      await centreModel.create(centre);
    } else existingRefNumbers.push(centre);
  }

  res.send({ message: "created centres", existingRefNumbers });
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

export const viewCentre = async (req, res) => {
  const centre = await centreModel.findById(req.params.id);
  if (!centre) return res.send("No centre found");

  res.send(centre);
};
