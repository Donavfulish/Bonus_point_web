import * as UserService from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
