import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";
type Language = "en" | "ar";

interface ThemeContextType {
	theme: Theme;
	language: Language;
	toggleTheme: () => void;
	setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("theme");
			return (saved as Theme) || "light";
		}
		return "light";
	});

	const [language, setLanguage] = useState<Language>(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("language");
			return (saved as Language) || "en";
		}
		return "en";
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("theme", theme);
			document.documentElement.classList.toggle("dark", theme === "dark");
			// document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
			document.documentElement.lang = language;
		}
	}, [theme, language]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider
			value={{ theme, language, toggleTheme, setLanguage }}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
