import crypto from "crypto";
import User from "../model/User.js";

const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

export const registerUser = async (request, response) => {
  try {
    const { name, email, password, picture } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({ message: "Name, email, and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return response.status(400).json({ message: "An account with this email already exists" });
    }

    // Generate unique sub identifier
    const sub = "manual_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
    const defaultPicture = picture || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`;

    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashPassword(password),
      sub,
      picture: defaultPicture,
    });

    await newUser.save();

    const userObject = newUser.toObject();
    delete userObject.password;

    return response.status(201).json(userObject);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return response.status(400).json({ message: "Invalid email or password" });
    }

    if (user.password) {
      const hashedPassword = hashPassword(password);
      if (user.password !== hashedPassword) {
        return response.status(400).json({ message: "Invalid email or password" });
      }
    }

    const userObject = user.toObject();
    delete userObject.password;

    return response.status(200).json(userObject);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const addUser = async (request, response) => {
  try {
    let exist = await User.findOne({ sub: request.body.sub });

    //  if user exists then send response
    if (exist) {
      response.status(200).json({ msg: "user already exists" });
      return;
    }

    // if new user then
    const newUser = new User(request.body);
    // save in the database
    await newUser.save();
    return response.status(200).json(newUser);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getUsers = async (request, response) => {
  try {
    const users = await User.find({});
    return response.status(200).json(users);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
