
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongoDB/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dallERoutes from "./routes/dallERoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dallE", dallERoutes);

app.get("/", async (request, result) => {
	result.send("Hello from DALL-E!");
});

const startServer = async () => {
	try {
		connectDB(process.env.MONGO_DB_URI);
	} catch (error) {
		console.log(error);
	}

	app.listen(8080, () => console.log("Server has started on port http://localhost:8080"));
}

startServer().then();
