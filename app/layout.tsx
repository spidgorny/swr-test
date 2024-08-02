"use client"

import {Inter} from "next/font/google";
import "./globals.css";
import {SWRConfig} from "swr";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
																		 children,
																	 }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<SWRConfig
			value={{
				fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
			}}
		>
			<body className={inter.className}>{children}</body>
		</SWRConfig>
		</html>
	);
}
