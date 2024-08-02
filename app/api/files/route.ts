import * as fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {NextResponse} from "next/server";
import {setTimeout} from "node:timers/promises";

export async function GET(request: Request) {
	await setTimeout(1000);
	let root = "public";
	return NextResponse.json(fs.readdirSync(root).map((file) => {
		let filePath = path.resolve(root, file);
		return {
			id: crypto.createHash('md5').update(filePath).digest('hex'),
			name: file,
			size: fs.statSync(filePath).size,
			mtime: fs.statSync(filePath).mtime
		};
	}));
}
