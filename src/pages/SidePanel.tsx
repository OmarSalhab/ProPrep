import { useState } from "react";
import { useTheme } from "../lib/context/ThemeContext";
import { useUserMenu } from "../lib/context/UserMenuContext";

import {
	ChevronLeft,
	ChevronRight,
	LayoutGrid,
	FileText,
	BrainCircuit,
} from "lucide-react";
function SidePanel({ setPageType, setShowSidePanel, showSidePanel }) {
	const [isOpen, setIsOpen] = useState(true);
	const { setShowUserMenu } = useUserMenu();
	const { theme, language } = useTheme();
	const [timerEnabled, setTimerEnabled] = useState(false);
	const [timerMinutes, setTimerMinutes] = useState(30);
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);

	const quizTypes = [
		{
			icon: <LayoutGrid className="w-5 h-5" />,
			titleEn: "Multiple Choice",
			titleAr: "اختيار من متعدد",
			descEn: "Create quizzes with multiple options",
			descAr: "إنشاء اختبارات متعددة الخيارات",
		},
		{
			icon: <FileText className="w-5 h-5" />,
			titleEn: "Essay Questions",
			titleAr: "أسئلة مقالية",
			descEn: "Generate open-ended questions",
			descAr: "إنشاء أسئلة مفتوحة",
		},
		{
			icon: <BrainCircuit className="w-5 h-5" />,
			titleEn: "AI Generated (coming soon)",
			titleAr: "توليد الذكاء الاصطناعي",
			descEn: "Smart question generation",
			descAr: "توليد أسئلة ذكية",
		},
	];
	const handelSidePanel = (target: number) => {
		if (target !== 2) {
			setPageType(target);
		}
	};

	return (
		<>
			{/* Existing Desktop Panel */}
			<div
				onClick={() => {
					setShowUserMenu(false);
				}}
				className={`fixed lg:block hidden left-0 h-full ${
					theme === "dark" ? "bg-gray-800" : "bg-white"
				} shadow-xl  ${
					isOpen ? (`${language === 'en' ? "max-w-80" : " max-w-80 pr-16" }`) : "w-16"
				} z-40`}
			>
				{/* Toggle Button */}
				<button
					onClick={() => {
						setIsOpen(!isOpen);
						setShowSidePanel(!showSidePanel);
					}}
					className={`absolute -right-3 top-40 p-1.5 rounded-full ${
						theme === "dark" ? "bg-gray-700" : "bg-white"
					} shadow-lg transform transition-transform hover:scale-110`}
				>
					{isOpen ? (
						<ChevronLeft
							className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
						/>
					) : (
						<ChevronRight
							className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
						/>
					)}
				</button>

				{/* Panel Content */}
				<div className="p-4 space-y-6">
					{/* Panel Title */}
					{isOpen && (
						<h2
							className={`text-lg font-semibold mb-6 ${
								theme === "dark" ? "text-white" : "text-gray-900"
							}`}
						>
							{language === "en"
								? "AI Quiz Dashboard"
								: "لوحة التحكم بلأختبارات"}
						</h2>
					)}

					{/* Quiz Type Options */}
					<div className="space-y-4">
						{quizTypes.map((type, index) => (
							<button
								onClick={() => {
									handelSidePanel(index);
								}}
								key={index}
								className={`w-full flex items-center ${
									isOpen ? "p-3" : "p-2 justify-center"
								} rounded-lg transition-colors ${
									theme === "dark"
										? "hover:bg-gray-700 text-gray-300"
										: "hover:bg-gray-100 text-gray-600"
								}`}
							>
								<div className="text-purple-500">{type.icon}</div>
								{isOpen && (
									<div
										className={`ml-3 text-left ${
											language === "ar" ? "rtl" : "ltr"
										}`}
									>
										<div
											className={`font-medium ${
												theme === "dark" ? "text-white" : "text-gray-900"
											}`}
										>
											{language === "en" ? type.titleEn : type.titleAr}
										</div>
										<div
											className={`text-sm ${
												theme === "dark" ? "text-gray-400" : "text-gray-500"
											}`}
										>
											{language === "en" ? type.descEn : type.descAr}
										</div>
									</div>
								)}
							</button>
						))}
					</div>

					{/* Timer Settings Section */}
					{isOpen && (
						<>
							<hr
								className={`border-t ${
									theme === "dark" ? "border-gray-700" : "border-gray-200"
								}`}
							/>

							<div className="space-y-4">
								<h3
									className={`text-sm font-medium ${
										theme === "dark" ? "text-white" : "text-gray-900"
									}`}
								>
									{language === "en" ? "Timer Settings" : "إعدادات المؤقت"}
								</h3>

								<div className="flex items-center justify-between">
									<span
										className={`text-sm ${
											theme === "dark" ? "text-gray-300" : "text-gray-600"
										}`}
									>
										{language === "en" ? "Enable Timer" : "تفعيل المؤقت"}
									</span>
									<button
										onClick={() => setTimerEnabled(!timerEnabled)}
										className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
											timerEnabled
												? "bg-purple-600"
												: theme === "dark"
												? "bg-gray-700"
												: "bg-gray-200"
										}`}
									>
										<span
											className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
												timerEnabled ? "translate-x-5" : "translate-x-0"
											}`}
										/>
									</button>
								</div>

								{timerEnabled && (
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<span
												className={`text-sm ${
													theme === "dark" ? "text-gray-300" : "text-gray-600"
												}`}
											>
												{timerMinutes} {language === "en" ? "minutes" : "دقيقة"}
											</span>
										</div>
										<input
											type="range"
											min="5"
											max="180"
											step="5"
											value={timerMinutes}
											onChange={(e) => setTimerMinutes(Number(e.target.value))}
											className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
										/>
										<div className="flex justify-between text-xs text-gray-500">
											<span>5m</span>
											<span>180m</span>
										</div>
									</div>
								)}
							</div>
						</>
					)}
				</div>
			</div>

			{/* Mobile Accordion */}
			<div className="lg:hidden w-full">
				<div
					className={`fixed top-16 left-0 right-0 z-30 ${
						theme === "dark"
							? "bg-gray-800/95 backdrop-blur-sm"
							: "bg-gray-50/95 backdrop-blur-sm"
					} shadow-md`}
				>
					{/* Accordion Header */}
					<button
						onClick={() => setIsAccordionOpen(!isAccordionOpen)}
						className={`w-full flex items-center justify-between p-4 ${
							theme === "dark"
								? "bg-gray-900/50 text-white"
								: "bg-white/50 text-gray-900"
						}`}
					>
						<div className="flex items-center space-x-2">
							<LayoutGrid className="w-5 h-5 text-purple-500" />
							<span className="font-medium">
								{language === "en" ? "Quiz Types" : "أنواع الاختبارات"}
							</span>
						</div>
						<ChevronRight
							className={`w-5 h-5 transition-transform duration-200 ${
								isAccordionOpen ? "rotate-90" : ""
							}`}
						/>
					</button>

					{/* Accordion Content */}
					<div
						className={`transition-all duration-200 ${
							isAccordionOpen ? "max-h-[calc(100vh-12rem)]" : "max-h-0"
						} overflow-y-auto`}
					>
						{/* Quiz Types Section */}
						<div className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
							{quizTypes.map((type, index) => (
								<button
									key={index}
									onClick={() => {
										handelSidePanel(index);
										setIsAccordionOpen(false);
									}}
									className={`w-full flex items-center p-3 rounded-lg ${
										theme === "dark"
											? "hover:bg-gray-700 text-gray-300"
											: "hover:bg-gray-100 text-gray-600"
									}`}
								>
									<div className="text-purple-500">{type.icon}</div>
									<div
										className={`ml-3 text-left ${
											language === "ar" ? "rtl" : "ltr"
										}`}
									>
										<div
											className={`font-medium ${
												theme === "dark" ? "text-white" : "text-gray-900"
											}`}
										>
											{language === "en" ? type.titleEn : type.titleAr}
										</div>
										<div
											className={`text-sm ${
												theme === "dark" ? "text-gray-400" : "text-gray-500"
											}`}
										>
											{language === "en" ? type.descEn : type.descAr}
										</div>
									</div>
								</button>
							))}
						</div>

						{/* Timer Settings Section */}
						<div className="px-4 pb-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
							<div className="pt-4">
								<h3
									className={`text-sm font-medium mb-4 ${
										theme === "dark" ? "text-white" : "text-gray-900"
									}`}
								>
									{language === "en" ? "Timer Settings" : "إعدادات المؤقت"}
								</h3>

								{/* Timer Toggle */}
								<div className="flex items-center justify-between mb-4">
									<span
										className={`text-sm ${
											theme === "dark" ? "text-gray-300" : "text-gray-600"
										}`}
									>
										{language === "en" ? "Enable Timer" : "تفعيل المؤقت"}
									</span>
									<button
										onClick={() => setTimerEnabled(!timerEnabled)}
										className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
											timerEnabled
												? "bg-purple-600"
												: theme === "dark"
												? "bg-gray-700"
												: "bg-gray-200"
										}`}
									>
										<span
											className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
												timerEnabled ? "translate-x-5" : "translate-x-0"
											}`}
										/>
									</button>
								</div>

								{/* Timer Range Control */}
								{timerEnabled && (
									<div className="space-y-2 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
										<div className="flex items-center justify-between">
											<span
												className={`text-sm ${
													theme === "dark" ? "text-gray-300" : "text-gray-600"
												}`}
											>
												{timerMinutes} {language === "en" ? "minutes" : "دقيقة"}
											</span>
										</div>
										<input
											type="range"
											min="5"
											max="180"
											step="5"
											value={timerMinutes}
											onChange={(e) => setTimerMinutes(Number(e.target.value))}
											className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
										/>
										<div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
											<span>5m</span>
											<span>180m</span>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SidePanel;
