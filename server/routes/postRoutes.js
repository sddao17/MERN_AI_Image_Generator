
import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongoDB/models/post.js";

dotenv.config();

const router = express.Router();

// Use Cloudinary to store images;
// Storing a few images as base-64 URLs will work, but as the project scales,
// we must provide storage for all the images
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create a Post
router.route("/").post(async (request, result) => {
	try {
		const { name, prompt, photo } = request.body;
		const photoURL = await cloudinary.uploader.upload(photo);

		const newPost = await Post.create({
			name,
			prompt,
			photo: photoURL.url
		});

		result.status(200).json({ success: true, data: newPost });
	} catch (error) {
		result.status(500).json({ success: false, message: error });
	}
});

// Get all Posts
router.route("/").get(async (request, result) => {
	try {
		const posts = await Post.find({});

		result.status(200).json({ success: true, data: posts });
	} catch (error) {
		result.status(500).json({ success: false, message: error });
	}
});

export default router;
