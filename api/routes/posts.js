import express from "express"; 
import { getPosts, addPost, updatePost, deletePost } from "../controllers/post.js";

const router = express.Router()
router.get("/", getPosts)
router.post("/", addPost)
router.put("/", updatePost)
router.delete("/:id", deletePost)

export default router