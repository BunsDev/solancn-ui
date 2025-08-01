"use client";

import React, {
	createContext,
	type ReactNode,
	useContext,
	useState,
} from "react";

interface TOCContextType {
	showTOC: boolean;
	setShowTOC: (show: boolean) => void;
}

const TOCContext = createContext<TOCContextType | undefined>(undefined);

export function TOCProvider({ children }: { children: ReactNode }) {
	const [showTOC, setShowTOC] = useState(false);

	return (
		<TOCContext.Provider value={{ showTOC, setShowTOC }}>
			{children}
		</TOCContext.Provider>
	);
}

export function useTOC() {
	const context = useContext(TOCContext);
	if (context === undefined) {
		throw new Error("useTOC must be used within a TOCProvider");
	}
	return context;
}
