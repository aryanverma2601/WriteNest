import { User } from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      username,
      password: hashpassword,
    });

    let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token, user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "User creation error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Login error" });
  }
};

const getUserProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id).populate("blogCreated");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching user profile" });
  }
};

export { registerUser, loginUser, getUserProfile };
