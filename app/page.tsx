"use client"

import {ListOfFiles, useFiles} from "@/app/list-of-files";

export default function Home() {
	const {isLoading, isValidating, isWorking} = useFiles();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="mb-10 w-full">
				<div>isLoading: {isLoading ? <span>YES</span> : <span>NO</span>}</div>
				<div>isValidating: {isValidating ? <span>YES</span> : <span>NO</span>}</div>
				<div>isWorking: {isWorking ? <span>YES</span> : <span>NO</span>}</div>
				<hr/>
			</div>
			<div className="flex flex-row gap-3 w-full flex-1">
				<ListOfFiles/>
				<ListOfFiles/>
			</div>
		</main>
	);
}
