
import FileSaver from "file-saver";
import { SURPRISE_ME_PROMPTS } from "../constants/index.js";

export function getRandomPrompt(prompt) {
	const randomIndex = Math.floor(Math.random() * SURPRISE_ME_PROMPTS.length);
	const randomPrompt = SURPRISE_ME_PROMPTS[randomIndex];

	if (randomPrompt === prompt) {
		getRandomPrompt(prompt);
	} else {
		return randomPrompt;
	}
}

export async function downloadImage(_id, photo) {
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
