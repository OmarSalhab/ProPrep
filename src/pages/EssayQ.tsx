import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
	FileText,
	AlertCircle,
	Loader2,
	FileUp,
	Type,
	BookOpen,
	GraduationCap,
	Clock,
	CheckCircle,
	List,
} from "lucide-react";

import { generateEssayQuiz } from "../lib/ollama";
// import { readPDF } from "../lib/pdfReader";
import { useTheme } from "../lib/context/ThemeContext";
import { useUserMenu } from "../lib/context/UserMenuContext";
import { useWindowSize } from "../lib/context/useWindowSize";

function EssayQ({ showSidePanel }) {
	const navigate = useNavigate();
	const { theme, language } = useTheme();
	const [dragActive, setDragActive] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [text, setText] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { setShowUserMenu } = useUserMenu();
	const [inputMethod, setInputMethod] = useState<"text" | "file">("text");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { width } = useWindowSize();
	const [difficultyLevel, setDifficultyLevel] = useState("medium");

	// Reuse existing file handling functions from MultipleQ
	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = async (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		const files = e.dataTransfer.files;
		if (files?.length) {
			await handleFileSelection(files[0]);
		}
	};

	const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files?.length) {
			await handleFileSelection(files[0]);
		}
	};

	const handleFileSelection = async (file: File) => {
		setError("");
		if (file.type !== "application/pdf") {
			setError(
				language === "en" ? "Please upload a PDF file" : "يرجى تحميل ملف PDF"
			);
			return;
		}
		if (file.size > 10 * 1024 * 1024) {
			setError(
				language === "en"
					? "File size should be less than 10MB"
					: "يجب أن يكون حجم الملف أقل من 10 ميجابايت"
			);
			return;
		}
		setLoading(true);
		try {
			// const extractedText = await readPDF(file);
			// setText(extractedText);
			// setFile(file);
		} catch (err) {
			setError(
				language === "en"
					? "Failed to read PDF file. Please try again."
					: "فشل في قراءة ملف PDF. حاول مرة اخرى."
			);
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!text.trim()) {
			setError(
				language === "en"
					? "Please enter some text or upload a PDF to generate a quiz"
					: "الرجاء إدخال نص أو تحميل ملف PDF لإنشاء اختبار"
			);
			return;
		}

		if (text.length < 200) {
			setError(
				language === "en"
					? "Please provide at least 200 characters of text"
					: "يرجى توفير 200 حرف على الأقل من النص"
			);
			return;
		}

		setLoading(true);
		try {
			const questions = await generateQuiz(text);
			navigate("/quiz", { state: { questions } });
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "An error occurred while generating the quiz"
			);
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleUserMenu = () => {
		setShowUserMenu(false);
	};

	const features = [
		{
			icon: <BookOpen className="h-6 w-6" />,
			title: language === "en" ? "Deep Analysis" : "تحليل عميق",
			description:
				language === "en"
					? "Generate thought-provoking essay questions that encourage critical thinking"
					: "توليد أسئلة مقالية تحفز التفكير النقدي",
		},
		{
			icon: <GraduationCap className="h-6 w-6" />,
			title: language === "en" ? "Academic Focus" : "تركيز أكاديمي",
			description:
				language === "en"
					? "Questions aligned with educational standards and learning objectives"
					: "أسئلة متوافقة مع المعايير التعليمية وأهداف التعلم",
		},
		{
			icon: <List className="h-6 w-6" />,
			title: language === "en" ? "Detailed Prompts" : "توجيهات مفصلة",
			description:
				language === "en"
					? "Clear instructions and context for comprehensive responses"
					: "تعليمات وسياق واضح للإجابات الشاملة",
		},
	];

	return (
		<div
			onClick={handleUserMenu}
			className={`min-h-screen ${
				showSidePanel && width >= 1025 ? "ml-80" : ""
			} ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50"} ${
				width < 1024 ? "pt-24" : ""
			}`}
		>
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center mb-12">
					<h2
						className={`text-3xl font-bold mb-4 ${
							theme === "dark" ? "text-white" : "text-gray-900"
						}`}
					>
						{language === "en"
							? "Essay Question Generator"
							: "مولد الأسئلة المقالية"}
					</h2>
					<p
						className={`text-lg ${
							theme === "dark" ? "text-gray-300" : "text-gray-600"
						} max-w-2xl mx-auto`}
					>
						{language === "en"
							? "Create thought-provoking essay questions with AI assistance. Upload content or enter your text to begin."
							: "قم بإنشاء أسئلة مقالية محفزة للتفكير بمساعدة الذكاء الاصطناعي. قم بتحميل المحتوى أو إدخال النص للبدء."}
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
					{features.map((feature, index) => (
						<div
							key={index}
							className={`${
								theme === "dark" ? "bg-gray-800" : "bg-white"
							} rounded-xl p-6 shadow-sm`}
						>
							<div className="text-purple-600 mb-4">{feature.icon}</div>
							<h3
								className={`text-lg font-semibold mb-2 ${
									theme === "dark" ? "text-white" : "text-gray-900"
								}`}
							>
								{feature.title}
							</h3>
							<p
								className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
							>
								{feature.description}
							</p>
						</div>
					))}
				</div>

				<div
					className={`${
						theme === "dark" ? "bg-gray-800" : "bg-white"
					} rounded-xl shadow-lg p-8`}
				>
					{/* ... Rest of the UI similar to MultipleQ but with essay-specific options ... */}
					{/* Add difficulty selector */}
					<div className="mb-6">
						<label
							className={`block text-sm font-medium mb-2 ${
								theme === "dark" ? "text-gray-200" : "text-gray-700"
							}`}
						>
							{language === "en" ? "Difficulty Level" : "مستوى الصعوبة"}
						</label>
						<select
							value={difficultyLevel}
							onChange={(e) => setDifficultyLevel(e.target.value)}
							className={`w-full rounded-lg shadow-sm ${
								theme === "dark"
									? "bg-gray-700 border-gray-600 text-white"
									: "bg-white border-gray-300 text-gray-900"
							}`}
						>
							<option value="easy">
								{language === "en" ? "Basic" : "أساسي"}
							</option>
							<option value="medium">
								{language === "en" ? "Intermediate" : "متوسط"}
							</option>
							<option value="hard">
								{language === "en" ? "Advanced" : "متقدم"}
							</option>
						</select>
					</div>

					<div
						className={`${
							theme === "dark" ? "bg-gray-800" : "bg-white"
						} rounded-xl shadow-lg p-8`}
					>
						{error && (
							<div className="mb-6 flex items-center p-4 text-red-700 bg-red-50 rounded-lg">
								<AlertCircle className="h-5 w-5 mr-2" />
								{error}
							</div>
						)}

						<div className="flex space-x-4 mb-8">
							<button
								onClick={() => setInputMethod("text")}
								className={`flex-1 flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
									inputMethod === "text"
										? "border-purple-600 bg-purple-50 text-purple-600"
										: `border-gray-200 ${
												theme === "dark"
													? "hover:border-purple-400"
													: "hover:border-purple-300"
										  }`
								}`}
							>
								<Type className="h-5 w-5 mr-2" />
								{language === "en" ? "Text Input" : "إدخال النص"}
							</button>
							<button
								onClick={() => setInputMethod("file")}
								className={`flex-1 flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
									inputMethod === "file"
										? "border-purple-600 bg-purple-50 text-purple-600"
										: `border-gray-200 ${
												theme === "dark"
													? "hover:border-purple-400"
													: "hover:border-purple-300"
										  }`
								}`}
							>
								<FileUp className="h-5 w-5 mr-2" />
								{language === "en" ? "PDF Upload" : "تحميل PDF"}
							</button>
						</div>

						<form onSubmit={handleSubmit} className="space-y-6">
							{inputMethod === "text" ? (
								<div className="space-y-2">
									<label
										htmlFor="text"
										className={`block text-sm font-medium ${
											theme === "dark" ? "text-gray-200" : "text-gray-700"
										}`}
									>
										{language === "en" ? "Enter your text" : "أدخل النص"}
									</label>
									<textarea
										id="text"
										rows={8}
										value={text}
										onChange={(e) => setText(e.target.value)}
										placeholder={
											language === "en"
												? "Enter at least 200 characters of text to generate a quiz..."
												: "أدخل 200 حرف على الأقل من النص لإنشاء اختبار..."
										}
										className={`block w-full rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
											theme === "dark"
												? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
												: "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
										}`}
									/>
									<div className="flex items-center justify-between text-sm text-gray-500">
										<span>
											{text.length} {language === "en" ? "characters" : "حرف"}
										</span>
										<span>
											{text.length >= 200 ? (
												<CheckCircle className="h-4 w-4 text-green-500" />
											) : language === "en" ? (
												"200 characters minimum"
											) : (
												"الحد الأدنى 200 حرف"
											)}
										</span>
									</div>
								</div>
							) : (
								<div
									className={`border-2 border-dashed rounded-lg p-8 text-center ${
										dragActive
											? "border-purple-600 bg-purple-50"
											: `${
													theme === "dark"
														? "border-gray-600"
														: "border-gray-300"
											  }`
									}`}
									onDragEnter={handleDrag}
									onDragLeave={handleDrag}
									onDragOver={handleDrag}
									onDrop={handleDrop}
								>
									<input
										ref={fileInputRef}
										type="file"
										accept=".pdf"
										onChange={handleFileInput}
										className="hidden"
									/>
									<div className="space-y-4">
										<div className="flex justify-center">
											<FileText
												className={`h-12 w-12 ${
													theme === "dark" ? "text-gray-400" : "text-gray-400"
												}`}
											/>
										</div>
										<div
											className={
												theme === "dark" ? "text-gray-300" : "text-gray-600"
											}
										>
											<button
												type="button"
												onClick={() => fileInputRef.current?.click()}
												className="text-purple-600 hover:text-purple-700 font-medium focus:outline-none"
											>
												{language === "en" ? "Click to upload" : "انقر للتحميل"}
											</button>{" "}
											{language === "en" ? "or drag and drop" : "أو اسحب وأفلت"}
										</div>
										<p
											className={`text-sm ${
												theme === "dark" ? "text-gray-400" : "text-gray-500"
											}`}
										>
											{language === "en"
												? "PDF files only (max 10MB)"
												: "ملفات PDF فقط (الحد الأقصى 10 ميجابايت)"}
										</p>
										{file && (
											<div className="flex items-center justify-center text-sm text-gray-600">
												<CheckCircle className="h-4 w-4 text-green-500 mr-2" />
												{file.name}
											</div>
										)}
									</div>
								</div>
							)}

							<button
								type="submit"
								disabled={loading || text.length < 200}
								className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
									theme === "dark" ? "focus:ring-offset-gray-900" : ""
								}`}
							>
								{loading ? (
									<>
										<Loader2 className="animate-spin h-5 w-5 mr-2" />
										{language === "en"
											? "Generating Quiz..."
											: "جاري إنشاء الاختبار..."}
									</>
								) : language === "en" ? (
									"Generate Quiz"
								) : (
									"إنشاء اختبار"
								)}
							</button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}

export default EssayQ;
