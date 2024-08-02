import * as fs from "node:fs";
import {NextResponse} from "next/server";
import {setTimeout} from "node:timers/promises";

export async function PUT(request: Request, {params}: { params: { id: string } }) {
	await setTimeout(1000);
	let fileBody = JSON.stringify(await request.json());
	fs.writeFileSync('public/' + params.id, fileBody)
	return NextResponse.json({
		status: 'ok',
	});
}
