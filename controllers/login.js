import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from "../models/user.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const dbUser = await User.findOne({ email: email }).exec();

    if (dbUser) {
      const match = await bcrypt.compare(password, dbUser.password);

      if (match) {
        const token = Jwt.sign(
          { _id: dbUser._id, name: dbUser.name, email },
          process.env.TOKEN_LOGIN_USER,
          { expiresIn: "1d" }
        );
        res.json({
          message: "Login Successful",
          token,
        });
      } else {
        res.status(400).json({ message: "Username or Password incorrect" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

export default login;
