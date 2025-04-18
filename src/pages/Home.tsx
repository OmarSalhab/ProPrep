import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Sparkles,
	Zap,
	BookOpenCheck,
	GraduationCap,
	Clock,
	FileText,
	Star,
	PlayCircle,
	Monitor,
	ChevronDown,
	Mail,
	Phone,
	Facebook,
	Twitter,
	Linkedin,
	Instagram,
} from "lucide-react";
import { useTheme } from "../lib/context/ThemeContext";
import { useUserMenu } from "../lib/context/UserMenuContext";
import Navbar from "./Navbar";

function Home() {
	const navigate = useNavigate();
	const [showTutorial, setShowTutorial] = useState(false);
	const { theme, language } = useTheme();
	const { setShowUserMenu } = useUserMenu();
	const [expandedItems, setExpandedItems] = useState<number[]>([]);

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
			title: language === "en" ? "Choose Quiz Type" : "اختر نوع الاختبار",
			description:
				language === "en"
					? "Select from multiple choice, essay questions, or AI-generated quizzes"
					: "اختر من الأسئلة متعددة الخيارات، الأسئلة المقالية، أو الاختبارات المولدة بالذكاء الاصطناعي",
		},
		{
			icon: <Sparkles className="h-8 w-8" />,
			title: language === "en" ? "Create Your Quiz" : "أنشئ اختبارك",
			description:
				language === "en"
					? "Upload content or type text, set timer options, and customize your quiz settings"
					: "قم بتحميل المحتوى أو كتابة النص، وضبط خيارات المؤقت، وتخصيص إعدادات الاختبار",
		},
		{
			icon: <BookOpenCheck className="h-8 w-8" />,
			title: language === "en" ? "Generate & Share" : "توليد ومشاركة",
			description:
				language === "en"
					? "Get instant AI-powered questions and share your quiz with students"
					: "احصل على أسئلة مدعومة بالذكاء الاصطناعي وشارك اختبارك مع الطلاب",
		},
	];

	const features = [
		{
			icon: <Zap className="h-8 w-8" />,
			title:
				language === "en"
					? "Multiple Quiz Types"
					: "أنواع متعددة من الاختبارات",
			description:
				language === "en"
					? "Create MCQs, essay questions, and AI-generated assessments"
					: "إنشاء أسئلة متعددة الخيارات، أسئلة مقالية، وتقييمات مولدة بالذكاء الاصطناعي",
		},
		{
			icon: <GraduationCap className="h-8 w-8" />,
			title: language === "en" ? "Timer Controls" : "التحكم بالوقت",
			description:
				language === "en"
					? "Set custom time limits for quizzes to match your needs"
					: "ضبط حدود زمنية مخصصة للاختبارات لتناسب احتياجاتك",
		},
		{
			icon: <Clock className="h-8 w-8" />,
			title: language === "en" ? "Instant Generation" : "توليد فوري",
			description:
				language === "en"
					? "Transform any content into professional quiz questions instantly"
					: "تحويل أي محتوى إلى أسئلة اختبار احترافية على الفور",
		},
	];

	const heroContent = {
		title:
			language === "en"
				? "Professional Quiz Generator with AI"
				: "مولد اختبارات احترافي بالذكاء الاصطناعي",
		description:
			language === "en"
				? "Create multiple-choice questions, essay prompts, and timed assessments with the power of AI"
				: "إنشاء أسئلة متعددة الخيارات، أسئلة مقالية، وتقييمات موقوتة بقوة الذكاء الاصطناعي",
	};

	const faqItems = [
		{
			question:
				language === "en"
					? "How does the AI generate questions?"
					: "كيف يقوم الذكاء الاصطناعي بتوليد الأسئلة؟",
			answer:
				language === "en"
					? "Our advanced AI system analyzes your content using natural language processing to identify key concepts, important facts, and relationships between ideas. It then generates multiple-choice questions with intelligent distractors based on common misconceptions and related concepts. The AI ensures questions are balanced across different cognitive levels (recall, understanding, application) and validates each distractor for plausibility and educational value."
					: "يقوم نظام الذكاء الاصطناعي المتقدم لدينا بتحليل المحتوى الخاص بك باستخدام معالجة اللغة الطبيعية لتحديد المفاهيم الرئيسية والحقائق المهمة والعلاقات بين الأفكار. ثم يقوم بإنشاء أسئلة متعددة الخيارات مع بدائل ذكية بناءً على المفاهيم الخاطئة الشائعة والمفاهيم ذات الصلة. يضمن الذكاء الاصطناعي توازن الأسئلة عبر مستويات معرفية مختلفة (التذكر والفهم والتطبيق) ويتحقق من صحة كل بديل للتأكد من معقوليته وقيمته التعليمية.",
		},
		{
			question:
				language === "en"
					? "Can I customize the timer settings for different sections of my quiz?"
					: "هل يمكنني تخصيص إعدادات المؤقت لأقسام مختلفة من الاختبار؟",
			answer:
				language === "en"
					? "Yes! Our flexible timer system allows you to set different time limits for various sections of your quiz. You can allocate more time for complex questions and less for simpler ones. The timer settings range from 5 to 180 minutes per section, and you can even set up progressive timing where time limits adjust based on question difficulty. The system also includes features like time warnings and automatic submission when time expires."
					: "نعم! يتيح نظام المؤقت المرن لدينا تعيين حدود زمنية مختلفة لأقسام مختلفة من الاختبار. يمكنك تخصيص وقت أطول للأسئلة المعقدة ووقت أقل للأسئلة البسيطة. تتراوح إعدادات المؤقت من 5 إلى 180 دقيقة لكل قسم، ويمكنك أيضًا إعداد توقيت تدريجي حيث تتعدل الحدود الزمنية بناءً على صعوبة السؤال. يتضمن النظام أيضًا ميزات مثل تنبيهات الوقت والتسليم التلقائي عند انتهاء الوقت.",
		},
		{
			question:
				language === "en"
					? "What types of content can I use to generate questions?"
					: "ما هي أنواع المحتوى التي يمكنني استخدامها لتوليد الأسئلة؟",
			answer:
				language === "en"
					? "Our system supports a wide range of content formats and subjects. You can upload PDF documents, paste text directly, or even import content from various sources. The AI is trained to handle academic texts, technical documentation, training materials, and general educational content. It excels at processing structured content but can also work with narrative texts, scientific papers, and educational resources. The system automatically adapts its question generation strategy based on the content type and complexity level."
					: "يدعم نظامنا مجموعة واسعة من تنسيقات المحتوى والمواضيع. يمكنك تحميل مستندات PDF، أو لصق النص مباشرة، أو حتى استيراد المحتوى من مصادر مختلفة. تم تدريب الذكاء الاصطناعي للتعامل مع النصوص الأكاديمية والوثائق التقنية ومواد التدريب والمحتوى التعليمي العام. يتفوق في معالجة المحتوى المنظم ولكنه يمكنه أيضًا العمل مع النصوص السردية والأوراق العلمية والموارد التعليمية. يقوم النظام تلقائيًا بتكييف استراتيجية توليد الأسئلة بناءً على نوع المحتوى ومستوى التعقيد.",
		},
	];

	const testimonials = [
		{
			name: language === "en" ? "Sarah Anderson" : "سارة أندرسون",
			role: language === "en" ? "University Professor" : "أستاذة جامعية",
			image: "https://randomuser.me/api/portraits/women/32.jpg",
			content:
				language === "en"
					? "The AI-powered quiz generation has transformed how I create assessments. The quality of questions and the time saved is remarkable."
					: "لقد غير توليد الاختبارات بالذكاء الاصطناعي طريقتي في إنشاء التقييمات. جودة الأسئلة والوقت الذي تم توفيره أمر رائع.",
		},
		{
			name: language === "en" ? "Dr. Mohammed Rahman" : "د. محمد رحمن",
			role: language === "en" ? "Educational Consultant" : "مستشار تعليمي",
			image: "https://randomuser.me/api/portraits/men/44.jpg",
			content:
				language === "en"
					? "The timer feature and multiple question types give me the flexibility I need. My students find the format engaging and professional."
					: "تمنحني ميزة المؤقت وأنواع الأسئلة المتعددة المرونة التي أحتاجها. يجد طلابي التنسيق جذابًا ومهنيًا.",
		},
		{
			name: language === "en" ? "Emily Chen" : "إيملي تشن",
			role: language === "en" ? "High School Teacher" : "مدرسة ثانوية",
			image: "https://randomuser.me/api/portraits/women/68.jpg",
			content:
				language === "en"
					? "Being able to generate questions from PDF content saves me hours of work. The AI understands context surprisingly well."
					: "القدرة على توليد أسئلة من محتوى PDF توفر علي ساعات من العمل. يفهم الذكاء الاصطناعي السياق بشكل مدهش.",
		},
	];

	return (
		<div
			className={`min-h-screen ${
				theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
			} transition-colors duration-300`}
		>
			{/* Header */}
			<Navbar>
				<button
					onClick={() => navigate("/dashboard")}
					className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
				>
					{language === "en" ? "Go to Dashboard" : "الذهاب إلى لوحة التحكم"}
				</button>
			</Navbar>

			<main onClick={handleUserMenu}>
				{/* HERO SECTION */}
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
									{heroContent.title}
								</h1>

								<p
									className={`text-lg ${
										theme === "dark" ? "text-gray-300" : "text-gray-600"
									}`}
								>
									{heroContent.description}
								</p>
								<div className="flex flex-col gap-1">
									<label>
										{language === "en"
											? "Loved by 1200+ customers."
											: "يحبه أكثر من +1200 مستخدم."}
									</label>
									<div className="flex gap-1">
										<Star className="text-yellow-400 fill-current" />
										<Star className="text-yellow-400 fill-current" />
										<Star className="text-yellow-400 fill-current" />
										<Star className="text-yellow-400 fill-current" />
										<Star className="text-yellow-400 fill-current" />
									</div>
								</div>

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
										onClick={() => document.getElementById("tutorial")?.scrollIntoView({behavior: "smooth"})}
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

				{/* Features Section */}
				<section
					className={`py-20 ${
						theme === "dark" ? "bg-gray-800" : "bg-purple-50"
					}`}
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2
								className={`text-3xl font-bold mb-4 ${
									theme === "dark" ? "text-white" : "text-gray-800"
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
											theme === "dark" ? "text-white" : "text-gray-800"
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
				{/* *****************Features Section******************* */}
				{/* HOW TO GENERATE A QUIZ */}
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
				{/* **********HOW TO GENERATE A QUIZ ***************** */}

				{/* How It Works Section */}
				<section id="tutorial"
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
								{language === "en" ? "How It Works" : "كيف يعمل"}
							</h2>
							<p
								className={`text-lg ${
									theme === "dark" ? "text-gray-300" : "text-gray-600"
								}`}
							>
								{language === "en"
									? "Watch our quick tutorial to get started"
									: "شاهد الشرح السريع للبدء"}
							</p>
						</div>

						<div className="relative mx-auto max-w-4xl">
							{/* Video Container with 16:9 Aspect Ratio */}
							<div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-600/20 to-purple-800/20 aspect-video">
								{/* Placeholder until video is added */}
								<div className="absolute inset-0 flex flex-col items-center justify-center">
									<div className="text-purple-500 mb-4">
										<PlayCircle className="w-16 h-16 animate-pulse" />
									</div>
									<p
										className={`text-lg font-medium ${
											theme === "dark" ? "text-gray-300" : "text-gray-600"
										}`}
									>
										{language === "en"
											? "Tutorial video coming soon"
											: "فيديو تعليمي قريباً"}
									</p>
								</div>
							</div>

							{/* Tutorial Call to Action */}
							<div  className="mt-8 text-center">
								<button
									onClick={() => setShowTutorial(true)}
									className={`group inline-flex items-center px-6 py-3 rounded-lg 
										${
											theme === "dark"
												? "bg-gray-700 hover:bg-gray-600"
												: "bg-white hover:bg-gray-50"
										} shadow-lg transition-all duration-300 transform hover:scale-105`}
								>
									<PlayCircle className="w-5 h-5 mr-2 text-purple-500" />
									<span
										className={`font-medium ${
											theme === "dark" ? "text-white" : "text-gray-900"
										}`}
									>
										{language === "en"
											? "Watch Interactive Tutorial"
											: "شاهد الشرح التفاعلي"}
									</span>
								</button>
							</div>

							{/* Feature List */}
							<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
								{[
									{
										icon: <Clock className="w-6 h-6" />,
										text:
											language === "en"
												? "5 minute tutorial"
												: "شرح لمدة 5 دقائق",
									},
									{
										icon: <Monitor className="w-6 h-6" />,
										text:
											language === "en"
												? "Step-by-step guide"
												: "دليل خطوة بخطوة",
									},
									{
										icon: <Sparkles className="w-6 h-6" />,
										text: language === "en" ? "Interactive demo" : "عرض تفاعلي",
									},
								].map((item, index) => (
									<div
										key={index}
										className="flex items-center justify-center space-x-2"
									>
										<div className="text-purple-500">{item.icon}</div>
										<span
											className={`text-sm ${
												theme === "dark" ? "text-gray-300" : "text-gray-600"
											}`}
										>
											{item.text}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
				{/* ******************How It Works Section********************* */}

				{/* Testimonials Section */}
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
								{language === "en"
									? "What Our Customers Are Saying"
									: "ماذا يقول عملاؤنا"}
							</h2>
							<p
								className={`text-lg ${
									theme === "dark" ? "text-gray-300" : "text-gray-600"
								}`}
							>
								{language === "en"
									? "Trusted by educators worldwide"
									: "موثوق به من قبل المعلمين في جميع أنحاء العالم"}
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{testimonials.map((testimonial, index) => (
								<div
									key={index}
									className={`${
										theme === "dark" ? "bg-gray-700" : "bg-white"
									} rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300`}
								>
									<div className="flex items-center mb-4">
										<img
											src={testimonial.image}
											alt={testimonial.name}
											className="w-12 h-12 rounded-full mr-4"
										/>
										<div>
											<h3
												className={`font-medium ${
													theme === "dark" ? "text-white" : "text-gray-900"
												}`}
											>
												{testimonial.name}
											</h3>
											<p
												className={`text-sm ${
													theme === "dark" ? "text-gray-300" : "text-gray-600"
												}`}
											>
												{testimonial.role}
											</p>
										</div>
									</div>
									<p
										className={`${
											theme === "dark" ? "text-gray-300" : "text-gray-600"
										}`}
									>
										{testimonial.content}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>
				{/* *************Testimonials Section**************** */}
				{/* FAQ Section */}
				<section
					className={`py-20 ${
						theme === "dark" ? "bg-gray-800" : "bg-purple-50"
					}`}
				>
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2
								className={`text-3xl font-bold mb-4 ${
									theme === "dark" ? "text-white" : "text-gray-900"
								}`}
							>
								{language === "en"
									? "Frequently Asked Questions"
									: "الأسئلة الشائعة"}
							</h2>
							<p
								className={`text-lg ${
									theme === "dark" ? "text-gray-300" : "text-gray-600"
								}`}
							>
								{language === "en"
									? "Find answers to common questions about our quiz generator"
									: "اعثر على إجابات للأسئلة الشائعة حول مولد الاختبارات لدينا"}
							</p>
						</div>

						<div className="space-y-4">
							{faqItems.map((item, index) => (
								<div
									key={index}
									className={`border rounded-lg overflow-hidden ${
										theme === "dark"
											? "border-gray-700 bg-gray-800"
											: "border-gray-200 bg-white"
									}`}
								>
									<button
										onClick={() => {
											const newExpandedItems = expandedItems.includes(index)
												? expandedItems.filter((i) => i !== index)
												: [...expandedItems, index];
											setExpandedItems(newExpandedItems);
										}}
										className={`w-full flex items-center justify-between p-4 text-left ${
											theme === "dark"
												? "hover:bg-gray-700"
												: "hover:bg-gray-50"
										}`}
									>
										<span
											className={`font-medium ${
												theme === "dark" ? "text-white" : "text-gray-900"
											}`}
										>
											{item.question}
										</span>
										<ChevronDown
											className={`w-5 h-5 text-gray-500 transform transition-transform ${
												expandedItems.includes(index) ? "rotate-180" : ""
											}`}
										/>
									</button>

									<div
										className={`transition-all duration-300 ease-in-out ${
											expandedItems.includes(index)
												? "max-h-96 opacity-100"
												: "max-h-0 opacity-0"
										} overflow-hidden`}
									>
										<p
											className={`p-4 ${
												theme === "dark" ? "text-gray-300" : "text-gray-600"
											} text-sm`}
										>
											{item.answer}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				{/* *************FAQ Section*************** */}
			</main>

			{/* Footer */}
			<footer
				className={`${
					theme === "dark" ? "bg-gray-900" : "bg-gray-50"
				} border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						{/* Company Info */}
						<div className="space-y-4">
							<h3
								className={`text-lg font-bold ${
									theme === "dark" ? "text-white" : "text-gray-900"
								}`}
							>
								ProPrep
							</h3>
							<p
								className={`text-sm ${
									theme === "dark" ? "text-gray-400" : "text-gray-600"
								}`}
							>
								{language === "en"
									? "Empowering educators with AI-powered assessment tools"
									: "تمكين المعلمين بأدوات التقييم المدعومة بالذكاء الاصطناعي"}
							</p>
						</div>

						{/* Quick Links */}
						<div className="space-y-4">
							<h4
								className={`text-sm font-semibold ${
									theme === "dark" ? "text-gray-300" : "text-gray-900"
								}`}
							>
								{language === "en" ? "Quick Links" : "روابط سريعة"}
							</h4>
							<ul className="space-y-2">
								{["Home", "Dashboard", "Pricing", "About"].map(
									(item, index) => (
										<li key={index}>
											<a
												href="#"
												className={`text-sm ${
													theme === "dark"
														? "text-gray-400 hover:text-white"
														: "text-gray-600 hover:text-gray-900"
												} transition-colors duration-200`}
											>
												{item}
											</a>
										</li>
									)
								)}
							</ul>
						</div>

						{/* Contact Info */}
						<div className="space-y-4">
							<h4
								className={`text-sm font-semibold ${
									theme === "dark" ? "text-gray-300" : "text-gray-900"
								}`}
							>
								{language === "en" ? "Contact" : "اتصل بنا"}
							</h4>
							<ul className="space-y-2">
								<li className="flex items-center space-x-2">
									<Mail className="w-4 h-4" />
									<span className="text-sm">support@quizgen.ai</span>
								</li>
								<li className="flex items-center space-x-2">
									<Phone className="w-4 h-4" />
									<span className="text-sm">+1 (555) 123-4567</span>
								</li>
							</ul>
						</div>

						{/* Social Links */}
						<div className="space-y-4">
							<h4
								className={`text-sm font-semibold ${
									theme === "dark" ? "text-gray-300" : "text-gray-900"
								}`}
							>
								{language === "en" ? "Follow Us" : "تابعنا"}
							</h4>
							<div className="flex space-x-4">
								{[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
									<a
										key={index}
										href="#"
										className={`${
											theme === "dark"
												? "text-gray-400 hover:text-white"
												: "text-gray-600 hover:text-gray-900"
										} transition-colors duration-200`}
									>
										<Icon className="w-5 h-5" />
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Copyright */}
					<div
						className={`mt-8 pt-8 border-t ${
							theme === "dark" ? "border-gray-800" : "border-gray-200"
						} text-center`}
					>
						<p
							className={`text-sm ${
								theme === "dark" ? "text-gray-400" : "text-gray-600"
							}`}
						>
							© {new Date().getFullYear()} Quiz Generator AI.{" "}
							{language === "en"
								? "All rights reserved."
								: "جميع الحقوق محفوظة."}
						</p>
					</div>
				</div>
			</footer>

			
		</div>
	);
}

export default Home;
