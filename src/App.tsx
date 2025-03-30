import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import { supabase } from "./lib/supabase";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			setIsAuthenticated(!!session);
		});

		// Check initial session
		checkSession();
	}, []);

	const checkSession = async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		setIsAuthenticated(!!session);
	};

	if (isAuthenticated === null) {
		return null; // Loading state
	}

	return (
		<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route
					path="/login"
					element={
						isAuthenticated ? <Navigate to="/home" replace /> : <Login />
					}
				/>
				<Route
					path="/signup"
					element={
						isAuthenticated ? <Navigate to="/home" replace /> : <SignUp />
					}
				/>
				<Route
					path="/dashboard"
					element={
						isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
					}
				/>
				<Route path="/home" element={<Home />} />
				<Route
					path="/quiz"
					element={
						isAuthenticated ? <Quiz /> : <Navigate to="/login" replace />
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
