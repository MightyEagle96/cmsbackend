import accountModel from "../models/accountModel.js";

export const createAccount = async (req, res) => {
  const account = await accountModel.findOne({ username: req.body.username });
  if (account)
    return res.status(409).send("An account with this username already exists");
  await accountModel.create(req.body);

  res.send("Account created");
};

export const loginAccount = async (req, res) => {
  const account = await accountModel.findOne(req.body);

  if (!account) return res.status(400).send("Invalid username and password");

  res.send(account);
};
