import bcrypt from 'bcrypt';
import validator from 'validator';
import User from '../models/user.js';

const { isEmail } = validator;
const saltRounds = 10;

const validateSignUpData = async (req, res) => {
    const { name, email, password } = req.body;

    if (name.trim().length === 0) {
        res.status(400).json({ message: "Please enter a name" });
        return false;
    }
    if (!isEmail(email)) {
        res.status(400).json({ message: "Please enter a valid email" });
        return false;
    }
    if (password.trim().length === 0) {
        res.status(400).json({ message: "Please enter a password" });
        return false;
    } else if (password.trim().length <= 5) {
        res.status(400).json({ message: "Minimum password length is 6 characters" });
        return false;
    }

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
        res.status(400).json({ message: "Email already taken, please try another one" });
        return false;
    }

    return true;
};

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    const isValid = await validateSignUpData(req, res);

    if (isValid) {
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = await User.create({ name, email, password: hashedPassword });
            res.json({
                message: "Account created successfully",
                user: { _id: newUser._id, name: newUser.name, email: newUser.email }
            });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(400).json({ message: "An error occurred while creating the account" });
        }
    }
};

export default signUp;
