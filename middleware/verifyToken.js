import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(403).json({ message: "Token not found" });
        }

        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, async (err, decode) => {
            if (err) {
                return res.status(403).json({ message: "The token is incorrect or has expired" });
            }

            if (!decode) {
                return res.status(404).json({ message: "Token decode failed" });
            }

            req.user = decode;
            return next(); 
        });

    } catch (error) {
        console.error("Error in verifyToken:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
