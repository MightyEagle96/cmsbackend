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
