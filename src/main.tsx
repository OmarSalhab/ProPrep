import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./lib/context/ThemeContext";
import { UserProvider } from "./lib/context/UserContext.tsx";
import { UserMenuProvider } from './lib/context/UserMenuContext';
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<UserProvider>
        <UserMenuProvider>
				<App />
        </UserMenuProvider>
			</UserProvider>
		</ThemeProvider>
	</StrictMode>
);
