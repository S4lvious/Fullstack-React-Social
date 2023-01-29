import express from "express"; 
import { getUsers, updateUser,findUsers } from "../controllers/user.js";

const router = express.Router()
router.get("/find/:userId", getUsers)
router.get("/search/:userName", findUsers)
router.put("/", updateUser)



export default router