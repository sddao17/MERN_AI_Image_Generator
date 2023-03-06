
import mongoose from "mongoose";

const Post = new mongoose.Schema({
	name: { type: String, required: true },
	prompt: { type: String, required: true },
	photo: { type: String, required: true }
});

// Export the model if it already exists, otherwise, create one and then export it
export default mongoose.models.Post || mongoose.model('Post', Post);
