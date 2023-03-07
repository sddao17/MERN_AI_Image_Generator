
import express from "express";
import * as dotenv from "dotenv";

import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

router.route("/").get((request, result) => {
	result.send("Hello from Dall-E!");
});

router.route("/").post(async (request, result) => {
	try {
		const { prompt } = request.body;

		const aiResponse = await openAI.createImage({
			prompt,
			n: 1,
			size: "1024x1024",
			response_format: "b64_json"
		});

		const image = aiResponse.data.data[0].b64_json;

		result.status(200).json({ photo: image })
	} catch (error) {
		console.log(error);
		result.status(500).send(error?.response.data.error.message);
	}
})

export default router;
