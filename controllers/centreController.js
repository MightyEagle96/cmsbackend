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
  const { page, limit } = req.query;
  const startIndex = (page - 1) * limit;

  const centresCount = await centreModel.countDocuments();
  const centres = await centreModel.find().skip(startIndex).limit(limit);

  res.send({
    startIndex: startIndex + 1,
    allResultsLength: centresCount,
    results: centres,
  });
};

export const centreSuggestions = async (req, res) => {
  try {
    const centres = await centreModel
      .find({
        $or: [
          { centreName: { $regex: req.body.value } },
          { adminEmail: { $regex: req.body.value } },
          { adminPhone: { $regex: req.body.value } },
          { adminName: { $regex: req.body.value } },
        ],
      })
      .limit(10);

    res.send(centres);
  } catch (error) {
    res.status(500).send(new Error(error).message);
  }
};

export const viewCentre = async (req, res) => {
  const centre = await centreModel.findById(req.params.id);
  if (!centre) return res.send("No centre found");

  res.send(centre);
};
