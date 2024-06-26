import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const getUserProfile = async (req, res) => {
  const { query } = req.params;


  try {
    let user;
    // Check if the query is a valid ObjectId or a username
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findById(query).select("-password -updatedAt");
    } else {
      user = await User.findOne({ username: query }).select(
        "-password -updatedAt"
      );
    }

    if (!user) {
      console.log("User not found"); // Debugging log
      return res.status(404).json({ error: "User not found" });
    }

   
    res.status(200).json(user);
  } catch (err) {
    console.error("Error in getUserProfile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser:", err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user)
      return res.status(400).json({ error: "Invalid username or password!" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ error: "Invalid username or password!" });

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in loginUser:", error.message);
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in logging out:", err.message);
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });
    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user.id } });
      await User.findByIdAndUpdate(req.user.id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed" });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user.id } });
      await User.findByIdAndUpdate(req.user.id, { $push: { following: id } });
      res.status(200).json({ message: "User followed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in followUnFollowUser:", err.message);
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;
  const userId = req.user._id;

  try {
    let userToUpdate = await User.findById(userId);
    if (!userToUpdate) return res.status(400).json({ error: "User not found" });
    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You cannot update another user's profile" });
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      userToUpdate.password = hashedPassword;
    }
    if (profilePic) {
      if (userToUpdate.profilePic) {
        await cloudinary.uploader.destroy(
          userToUpdate.profilePic.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }

    userToUpdate.name = name || userToUpdate.name;
    userToUpdate.email = email || userToUpdate.email;
    userToUpdate.username = username || userToUpdate.username;
    userToUpdate.profilePic = profilePic || userToUpdate.profilePic;
    userToUpdate.bio = bio || userToUpdate.bio;

    await userToUpdate.save();

    await Post.updateMany(
      {"replies.userId":userId},
      {
        $set:{
          "replies.$[reply].username":userToUpdate.username,
          "replies.$[reply].profilePic":userToUpdate.profilePic
        }
      },
      {arrayFilters:[{"reply.userId":userId}]}
    )

    // Remove password field from the user object before sending it back
    userToUpdate.password = null;

    res.status(200).json(userToUpdate);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in updateUser:", err.message);
  }
};

export {
  signupUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUser,
  followUnFollowUser,
};
