import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Sparkles,
	Zap,
	BookOpenCheck,
	GraduationCap,
	Clock,
	FileText,
} from "lucide-react";
import { useTheme } from "../lib/context/ThemeContext";
import Navbar from "./Navbar";

function Home() {
	const navigate = useNavigate();
	const [showUserMenu, setShowUserMenu] = useState(false);
	const [showTutorial, setShowTutorial] = useState(false);
	const [tutorialStep, setTutorialStep] = useState(1);
	const { theme, language } = useTheme();

	useEffect(() => {
		const isFirstVisit = !localStorage.getItem("tutorialComplete");
		if (isFirstVisit) {
			setShowTutorial(true);
			localStorage.setItem("tutorialComplete", "true");
		}
	}, []);

	const handleUserMenu = () => {
		setShowUserMenu(false);
	};

	const howToSteps = [
		{
			icon: <FileText className="h-8 w-8" />,
			title: language === "en" ? "Input Your Content" : "أدخل المحتوى",
			description:
				language === "en"
					? "Upload a PDF or paste your text directly into the editor"
					: "قم بتحميل ملف PDF أو لصق النص مباشرة في المحرر",
		},
		{
			icon: <Sparkles className="h-8 w-8" />,
			title: language === "en" ? "AI Processing" : "معالجة الذكاء الاصطناعي",
			description:
				language === "en"
					? "Our AI analyzes your content and generates relevant questions"
					: "يقوم الذكاء الاصطناعي لدينا بتحليل المحتوى وإنشاء أسئلة ذات صلة",
		},
		{
			icon: <BookOpenCheck className="h-8 w-8" />,
			title: language === "en" ? "Review & Customize" : "مراجعة وتخصيص",
			description:
				language === "en"
					? "Review the generated questions and customize as needed"
					: "راجع الأسئلة المولدة وقم بتخصيصها حسب الحاجة",
		},
	];

	const features = [
		{
			icon: <Zap className="h-8 w-8" />,
			title: language === "en" ? "Instant Generation" : "توليد فوري",
			description:
				language === "en"
					? "Create comprehensive quizzes in seconds"
					: "إنشاء اختبارات شاملة في ثوانٍ",
		},
		{
			icon: <GraduationCap className="h-8 w-8" />,
			title: language === "en" ? "Smart Learning" : "التعلم الذكي",
			description:
				language === "en"
					? "AI-powered questions that test understanding"
					: "أسئلة مدعومة بالذكاء الاصطناعي تختبر الفهم",
		},
		{
			icon: <Clock className="h-8 w-8" />,
			title: language === "en" ? "Time Saving" : "توفير الوقت",
			description:
				language === "en"
					? "Save hours of manual question creation"
					: "وفر ساعات من إنشاء الأسئلة اليدوية",
		},
	];

	return (
		<div
			className={`min-h-screen ${
				theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
			} transition-colors duration-300`}
		>
			{/* Header */}
			<Navbar showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu}>
				<button
					onClick={() => navigate("/dashboard")}
					className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
				>
					{language === "en" ? "Go to Dashboard" : "الذهاب إلى لوحة التحكم"}
				</button>
			</Navbar>

			<main onClick={handleUserMenu}>
				<section
					className={`py-20 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
							{/* Content Side */}
							<div className="w-full md:w-1/2 space-y-6">
								<h1
									className={`text-4xl md:text-5xl font-bold leading-tight ${
										theme === "dark" ? "text-white" : "text-gray-900"
									}`}
								>
									{language === "en"
										? "Create Professional Quizzes with AI"
										: "إنشاء اختبارات احترافية باستخدام الذكاء الاصطناعي"}
								</h1>

								<p
									className={`text-lg ${
										theme === "dark" ? "text-gray-300" : "text-gray-600"
									}`}
								>
									{language === "en"
										? "Transform your content into engaging quizzes instantly using advanced AI technology"
										: "حول المحتوى الخاص بك إلى اختبارات تفاعلية على الفور باستخدام تقنية الذكاء الاصطناعي المتقدمة"}
								</p>

								<div className="flex flex-col sm:flex-row gap-4">
									<button
										onClick={() => navigate("/dashboard")}
										className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
              transition-colors duration-300"
									>
										{language === "en" ? "Get Started" : "ابدأ الآن"}
									</button>
									<button
										onClick={() => setShowTutorial(true)}
										className={`px-6 py-3 rounded-lg border-2 
              ${
								theme === "dark"
									? "border-gray-700 hover:border-gray-600 text-gray-300"
									: "border-gray-200 hover:border-gray-300 text-gray-600"
							} transition-colors duration-300`}
									>
										{language === "en" ? "Watch Tutorial" : "شاهد الشرح"}
									</button>
								</div>
							</div>

							{/* Image Side */}
							<div className="w-full md:w-1/2">
								<img
									src="/images/hero.png"
									alt={
										language === "en"
											? "Quiz Generation Process"
											: "عملية إنشاء الاختبار"
									}
									className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-700 "
								/>
							</div>
						</div>
					</div>
				</section>
				<section
					className={`py-20 ${
						theme === "dark" ? "bg-gray-800" : "bg-purple-50"
					}`}
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2
								className={`text-3xl font-bold mb-4 ${
									theme === "dark" ? "text-white" : "text-gray-900"
								}`}
							>
								{language === "en"
									? "How to Generate a Quiz"
									: "كيفية إنشاء اختبار"}
							</h2>
							<p
								className={`text-lg ${
									theme === "dark" ? "text-gray-300" : "text-gray-600"
								}`}
							>
								{language === "en"
									? "Create professional quizzes in three simple steps"
									: "إنشاء اختبارات احترافية في ثلاث خطوات بسيطة"}
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{howToSteps.map((step, index) => (
								<div
									key={index}
									className={`${
										theme === "dark" ? "bg-gray-700" : "bg-white"
									} rounded-xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in`}
									style={{ animationDelay: `${index * 200}ms` }}
								>
									<div className="text-purple-600 mb-4">{step.icon}</div>
									<h3
										className={`text-xl font-bold mb-2 ${
											theme === "dark" ? "text-white" : "text-gray-900"
										}`}
									>
										{step.title}
									</h3>
									<p
										className={
											theme === "dark" ? "text-gray-300" : "text-gray-600"
										}
									>
										{step.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section
					className={`py-20 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2
								className={`text-3xl font-bold mb-4 ${
									theme === "dark" ? "text-white" : "text-gray-900"
								}`}
							>
								{language === "en" ? "Powerful Features" : "ميزات قوية"}
							</h2>
							<p
								className={`text-lg ${
									theme === "dark" ? "text-gray-300" : "text-gray-600"
								}`}
							>
								{language === "en"
									? "Everything you need to create perfect quizzes"
									: "كل ما تحتاجه لإنشاء اختبارات مثالية"}
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{features.map((feature, index) => (
								<div
									key={index}
									className={`${
										theme === "dark" ? "bg-gray-800" : "bg-white"
									} rounded-xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 animate-slide-up`}
									style={{ animationDelay: `${index * 200}ms` }}
								>
									<div className="text-purple-600 mb-4">{feature.icon}</div>
									<h3
										className={`text-xl font-bold mb-2 ${
											theme === "dark" ? "text-white" : "text-gray-900"
										}`}
									>
										{feature.title}
									</h3>
									<p
										className={
											theme === "dark" ? "text-gray-300" : "text-gray-600"
										}
									>
										{feature.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>

			{/* Rest of the existing sections with dark mode and RTL support */}
			{/* ... */}

			{/* Tutorial Modal */}
			{showTutorial && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div
						className={`${
							theme === "dark" ? "bg-gray-800" : "bg-white"
						} rounded-xl p-8 max-w-md animate-fade-in`}
					>
						this is the tutorial
						{/* Tutorial content */}
					</div>
				</div>
			)}
		</div>
	);
}

export default Home;
