import { verify } from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      errorCode: "token.invalid",
    });
  }
  const [, token] = authToken.split(" ");
  try {
    const { id } = verify(token, process.env.JWT_SECRET);

    req.user_id = id;
    return next();
  } catch (error) {
    return res.status(401).json({
      errorCode: "token.error",
    });
  }
};
