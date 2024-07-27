import { Router } from 'express';
import login from '../controllers/login.js';
import authController from '../controllers/auth.js';
import signUp from '../controllers/signUp.js';


const Auth = Router();

Auth.post('/signup', signUp);
Auth.post('/login', login);
Auth.post('/auth', authController);

export default Auth;
