import Jwt from 'jsonwebtoken';

const authController = (req, res) => {
  const { token } = req.body;

  if (token) {
    try {
      const decoded = Jwt.verify(token, process.env.TOKEN_LOGIN_USER);

      res.json({
        auth: true,
        data: decoded,
      });
    } catch (error) {
      res.json({
        auth: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      auth: false,
      data: "No token found in the request",
    });
  }
};

export default authController;
