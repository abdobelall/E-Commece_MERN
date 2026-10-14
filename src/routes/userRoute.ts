import { login } from "../service/userService.js";
import express from "express";
import { register } from "../service/userService.js";

const route = express.Router();

route.post ("/register", async (req, res) => {
  const {name, email, password} = req.body;
  const {statusCode, data} = await register ({name, email, password});
  res.status(statusCode).send(data);
});

route.post ("/login", async (req, res) => {
  const {email, password} = req.body;
  const {statusCode, data} = await login ({email, password});
  res.status(statusCode).send(data);
});

export default route;