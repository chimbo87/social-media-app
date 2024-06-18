import express from "express";
import { createPost, getPost,deletePost ,getFeedPosts, likeUnLikePost,replyToPost, getUserPosts} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed",protectRoute, getFeedPosts);
router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.post("/create",protectRoute, createPost);
router.delete("/:id",protectRoute, deletePost);
router.post("/like/:id",protectRoute, likeUnLikePost);
router.post("/reply/:id",protectRoute, replyToPost);


export default router;