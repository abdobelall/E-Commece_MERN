import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface RegisterParams {
  name: string;
  password: string;
  email: string;
}

export const register = async ({ name, password, email }: RegisterParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return {data : "User already exists", statusCode : 400};
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({ name, password: hashedpassword , email });
  await newUser.save()

  return {data: generateJWT({ email, name }), statusCode: 200};
}

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return {data : "User not found", statusCode : 400};
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (passwordMatch) {
    return {data: generateJWT({ email, name: findUser.name }), statusCode: 200};
  }

  else {
    return {data : "Invalid password or email", statusCode : 400};
  }
}

const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || "" )
}