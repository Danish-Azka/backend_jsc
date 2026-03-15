import express from "express"
import { verifyToken } from "../middleware/verifyToken.js";
import { getAdmin, loginAdmin, logoutAdmin, registerAdmin } from "../controller/adminController.js";

const adminRoute = express.Router();

adminRoute.post("/admin/regist", registerAdmin)
adminRoute.post("/admin/login", loginAdmin)
adminRoute.delete("/admin/logout", logoutAdmin)
adminRoute.get("/admin/get", verifyToken, getAdmin)
adminRoute.get("/auth/me", verifyToken, (req, res) => {
  res.json({
    user: req.user
  });
});

export { adminRoute }