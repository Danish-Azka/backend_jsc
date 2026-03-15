import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(403).json({ message: "Token not found" });
    }

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decode) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "The token is incorrect or has expired" });
      }

      req.user = decode;
      next();
    });
  } catch (error) {
    console.error("Error in verifyToken:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
