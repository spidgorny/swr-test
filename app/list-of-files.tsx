"use client"

import useSWR from "swr";
import {useState} from "react";
import {FidgetSpinner} from "react-loader-spinner";

export function useFiles() {
	const {isLoading, isValidating, data, error, mutate} = useSWR<{
		id: string;
		name: string;
		size: number;
		mtime: string;
	}[]>("/api/files");
	const [isWorking, setIsWorking] = useState(false);

	const touchFile = async (id: string) => {
		setIsWorking(true);
		try {
			await fetch(`/api/files/${id}`, {
				method: "PUT",
				body: JSON.stringify({}),
				headers: {
					"Content-Type": "application/json"
				}
			});
			await mutate();
		} finally {
			setIsWorking(false);
		}
	}

	return {
		isLoading,
		isValidating,
		files: data ?? [],
		error,
		mutate,
		touchFile,
		isWorking
	};
}

export function ListOfFiles() {
	const {isLoading, isValidating, files, mutate, touchFile, isWorking} = useFiles();

	return <div className="flex-1">
		<div className="flex justify-between">
			<button className="bg-fuchsia-800 px-4 py-1 rounded m-1" onClick={() => mutate()}>Mutate
			</button>
			<span className="px-2">{isValidating && <FidgetSpinner
				height="32"
				width="32"
			/>}</span>
		</div>
		<div className="flex justify-between">
			<div>
				<button className="bg-fuchsia-800 px-4 py-1 rounded m-1" onClick={() => touchFile('asd')}>Touch asd</button>
				<button className="bg-fuchsia-800 px-4 py-1 rounded m-1" onClick={() => touchFile('bas')}>Touch bas</button>
			</div>
			<span
				className="px-2">{isWorking && <FidgetSpinner
				height="32"
				width="32"
			/>}</span>
		</div>
		<ul className="font-mono">
			{files.map((file) => (
				<li key={file.id} className="flex flex-row justify-between">
					<span>{file.name}</span>
					<span>{file.mtime}</span>
				</li>
			))}
		</ul>
	</div>
}
