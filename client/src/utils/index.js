
import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants/index.js";

export function getRandomPrompt(prompt) {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
	const randomPrompt = surpriseMePrompts[randomIndex];

	if (randomPrompt === prompt) {
		getRandomPrompt(prompt);
	} else {
		return randomPrompt;
	}
}

export async function downloadImage(_id, photo) {
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
