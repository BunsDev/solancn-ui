"use client";
import { useEffect, useState } from "react";
import type { BuiltinLanguage } from "shiki";
import { codeToHtml } from "shiki";

interface CodeRendererProps {
	code: string;
	lang: BuiltinLanguage;
}

export const CodeRenderer = ({ code, lang = "tsx" }: CodeRendererProps) => {
	const [html, setHtml] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const highlightCode = async () => {
			setIsLoading(true);
			try {
				const highlightedHtml = await codeToHtml(code, {
					lang,
					themes: {
						light: "github-light",
						dark: "github-dark-default",
					},
					defaultColor: false,
					transformers: [
						{
							name: "remove-pre-bg",
							pre(node) {
								// Remove background from pre to let our CSS handle it
								delete node.properties.style;
							},
						},
					],
				});
				setHtml(highlightedHtml);
			} catch (error) {
				console.error("Error highlighting code:", error);
				// Fallback to plain text
				setHtml(`<pre><code>${code}</code></pre>`);
			} finally {
				setIsLoading(false);
			}
		};

		highlightCode();
	}, [code, lang]);

	if (isLoading) {
		return (
			<div className="font-normal text-xs sm:text-sm w-full">
				<div className="p-2 sm:p-4 pr-3 sm:pr-5">
					<pre className="overflow-x-auto">
						<code>{code}</code>
					</pre>
				</div>
			</div>
		);
	}

	return (
		<div className="font-normal text-xs sm:text-sm w-full">
			<div
				className="p-2 sm:p-4 pr-3 sm:pr-5"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
};
