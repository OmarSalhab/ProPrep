import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../lib/context/UserContext";
import {
	BookOpen,
	LogOut,
	User,
	ChevronDown,
	Sun,
	Moon,
	Languages,
	Menu,
	X,
	Brain,
	LogIn,
} from "lucide-react";
import { useTheme } from "../lib/context/ThemeContext";
import { supabase } from "../lib/supabase";
import { useUserMenu } from "../lib/context/UserMenuContext";

function Navbar({children }) {
	const { showUserMenu, setShowUserMenu } = useUserMenu();
	const [showUserSliderMenu, setshowUserSliderMenu] = useState(false);
	const { theme, language, toggleTheme, setLanguage } = useTheme();
	const { userName,setUserName} = useUser();
	const navigate = useNavigate();
	

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		setShowUserMenu(false);
		setUserName("");
	};
	return (
		<>
			{/* Header */}
			<header
				className={`${
					theme === "dark" ? "bg-gray-800" : "bg-white"
				} shadow-sm sticky top-0 z-50 transition-colors duration-300`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div
							onClick={() => {
								navigate("/home");
							}}
							className="flex items-center cursor-pointer"
						>
							<BookOpen className="h-8 w-8 text-purple-600" />
							<h1
								className={`ml-3 text-2xl font-bold ${
									theme === "dark" ? "text-white" : "text-gray-900"
								}`}
							>
								ProPrep
							</h1>
						</div>
						<div className="hidden sm:flex items-center space-x-4">
							<button
								onClick={toggleTheme}
								className={`p-2 rounded-lg ${
									theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
								}`}
							>
								{theme === "dark" ? (
									<Sun className="h-5 w-5  text-white" />
								) : (
									<Moon className="h-5 w-5  text-gray-900"  />
								)}
							</button>

							<button
								onClick={() => setLanguage(language === "en" ? "ar" : "en")}
								className={`p-2 rounded-lg ${
									theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
								}`}
							>
								<Languages className={`h-5 w-5 ${theme === 'dark'?' text-white': "text-gray-900"}`} />
							</button>

							{children}

							<div className="relative ">
								{userName.length > 0 ? (
									<button
										onClick={() => setShowUserMenu(!showUserMenu)}
										className={`flex items-center space-x-2 ${
											theme === "dark"
												? "text-white hover:text-purple-400"
												: "text-gray-700 hover:text-purple-600"
										}`}
									>
										<div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
											{userName.charAt(0).toUpperCase()}
										</div>
										<span>{userName}</span>
										<ChevronDown className="h-4 w-4" />
									</button>
								) : (
									<button
										onClick={() => {
											navigate("/login");
										}}
										className={`flex items-center space-x-2 ${
											theme === "dark"
												? "text-white hover:text-purple-400"
												: "text-gray-700 hover:text-purple-600"
										} px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg
                                        hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
									>
										{language === "en" ? "Login":"تسجيل الدخول"} <LogIn className="h-4 w-4  ml-2" />
									</button>
								)}
								{showUserMenu && (
									<div
										className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 ${
											theme === "dark" ? "bg-gray-800" : "bg-white"
										}`}
									>
										<button
											onClick={() => {
												/* TODO: Implement profile settings */
											}}
											className={`flex items-center w-full px-4 py-2 text-sm ${
												theme === "dark"
													? "text-gray-300 hover:bg-gray-700"
													: "text-gray-700 hover:bg-purple-50"
											}`}
										>
											{/* User menu items */}
											<User className="h-4 w-4 mr-2" />
											{language === "en" ? "Profile" : "الملف الشخصي"}
										</button>

										<button
											onClick={handleSignOut}
											className={`flex items-center w-full px-4 py-2 text-sm ${
												theme === "dark"
													? "text-gray-300 hover:bg-gray-700"
													: "text-gray-700 hover:bg-purple-50"
											}`}
										>
											<LogOut className="h-4 w-4 mr-2" />
											{language === "en" ? "Sign Out" : "تسجيل الخروج"}
										</button>
									</div>
								)}
							</div>
						</div>

						<div className="sm:hidden">
							<button
								onClick={() => setshowUserSliderMenu(!showUserSliderMenu)}
							>
								{showUserSliderMenu ? (
									<X className="h-6 w-6" />
								) : (
									<Menu className="h-6 w-6 " />
								)}
							</button>

							{/* Sliding Menu Overlay */}
							<div
								className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
									showUserSliderMenu
										? "opacity-100"
										: "opacity-0 pointer-events-none"
								}`}
								onClick={() => setshowUserSliderMenu(false)}
							/>

							{/* Sliding Menu Panel */}
							<div
								className={`fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 ease-in-out ${
									showUserSliderMenu ? "translate-x-0" : "translate-x-full"
								} ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg`}
							>
								<div className="p-4">
									{/* User Profile Section */}
									<div className="flex items-center space-x-3 mb-6 pt-2">
										<div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
											{userName.charAt(0).toUpperCase()}
										</div>
										<span
											className={
												theme === "dark" ? "text-white" : "text-gray-900"
											}
										>
											{userName}
										</span>
									</div>

									{/* Menu Items */}
									<nav className="space-y-2">
										{userName.length > 0 ? (
											<button
												onClick={() => {
													/* TODO: Profile settings */
													setshowUserSliderMenu(false);
												}}
												className={`flex items-center w-full p-3 rounded-lg ${
													theme === "dark"
														? "text-gray-300 hover:bg-gray-700"
														: "text-gray-700 hover:bg-gray-100"
												}`}
											>
												<User className="h-5 w-5 mr-3" />
												{language === "en" ? "Profile" : "الملف الشخصي"}
											</button>
										) : (
											<button
												onClick={() => {
													/* TODO: Profile settings */
													setshowUserSliderMenu(false);
													navigate("/login");
												}}
												className={`flex items-center w-full p-3 rounded-lg ${
													theme === "dark"
														? "text-gray-300 hover:bg-gray-700"
														: "text-gray-700 hover:bg-gray-100"
												}`}
											>
												<LogIn className="h-5 w-5 mr-3" />
												{language === "en" ? "Login" : "تسحيل الدخول"}
											</button>
										)}
										<button
											onClick={() => {
												navigate("/dashboard");
											}}
											className={`flex items-center w-full p-3 rounded-lg ${
												theme === "dark"
													? "text-gray-300 hover:bg-gray-700"
													: "text-gray-700 hover:bg-gray-100"
											}`}
										>
											<Brain className="h-5 w-5 mr-3" />
											{language === "en"
												? "Go to Dashboard"
												: "اذهب إلى لوحة القيادة"}
										</button>
										<button
											onClick={toggleTheme}
											className={`flex items-center w-full p-3 rounded-lg ${
												theme === "dark"
													? "text-gray-300 hover:bg-gray-700"
													: "text-gray-700 hover:bg-gray-100"
											}`}
										>
											{theme === "dark" ? (
												<Sun className="h-5 w-5 mr-3" />
											) : (
												<Moon className="h-5 w-5 mr-3" />
											)}
											{language === "en" ? "Theme" : "المظهر"}
										</button>

										<button
											onClick={() =>
												setLanguage(language === "en" ? "ar" : "en")
											}
											className={`flex items-center w-full p-3 rounded-lg ${
												theme === "dark"
													? "text-gray-300 hover:bg-gray-700"
													: "text-gray-700 hover:bg-gray-100"
											}`}
										>
											<Languages className="h-5 w-5 mr-3" />
											{language === "en" ? "Language" : "اللغة"}
										</button>

										<button
											onClick={handleSignOut}
											className={`flex items-center w-full p-3 rounded-lg ${
												theme === "dark"
													? "text-gray-300 hover:bg-gray-700"
													: "text-gray-700 hover:bg-gray-100"
											}`}
										>
											<LogOut className="h-5 w-5 mr-3" />
											{language === "en" ? "Sign Out" : "تسجيل الخروج"}
										</button>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

export default Navbar;
