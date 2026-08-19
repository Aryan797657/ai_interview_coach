import { Router } from "express";
import { registerUser , loginUser} from "../controllers/user.controller.js";
import { validateRegisterRequest } from "../middlewares/validateRegisterRequest.js";
import { validateLoginRequest } from "../middlewares/validateLoginRequest.js";

const router = Router();

router.post("/register", validateRegisterRequest, registerUser);
router.post("/login" , validateLoginRequest ,loginUser)

export default router;