import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, Download } from "lucide-react";
import { useTheme } from "../lib/context/ThemeContext";
import { PDFDocument, rgb } from 'pdf-lib';

interface Question {
	question: string;
	options: string[];
	correctAnswer: number;
}

const scoreMessages = [
  {
    range: [0, 20],
    en: "Well... at least you spelled your name right! 😅",
    ar: "حسناً... على الأقل كتبت اسمك بشكل صحيح! 😅"
  },
  {
    range: [21, 40],
    en: "Keep studying, or consider a career in comedy instead! 😄",
    ar: "واصل المذاكرة، أو فكر في مهنة في الكوميديا! 😄"
  },
  {
    range: [41, 60],
    en: "Not bad, not good... perfectly balanced, as all things should be! 🎭",
    ar: "ليس سيئاً، ليس جيداً... متوازن تماماً، كما يجب أن تكون الأمور! 🎭"
  },
  {
    range: [61, 80],
    en: "Pretty good! Your brain cells are definitely having a party! 🎉",
    ar: "جيد جداً! خلايا دماغك تحتفل بالتأكيد! 🎉"
  },
  {
    range: [81, 99],
    en: "Amazing! You're so close to perfection, it's scary! 🌟",
    ar: "مذهل! أنت قريب جداً من الكمال، إنه أمر مخيف! 🌟"
  },
  {
    range: [100, 100],
    en: "Perfect score! Are you sure you're not an AI? 🤖",
    ar: "درجة كاملة! هل أنت متأكد أنك لست ذكاءً اصطناعياً؟ 🤖"
  }
];

function Quiz() {
	const location = useLocation();
	const navigate = useNavigate();
	const { theme, language } = useTheme();
	const questions = location.state?.questions as Question[];
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
	const [showResults, setShowResults] = useState(false);

	if (!questions) {
		navigate("/dashboard");
		return null;
	}

	const handleAnswerSelect = (optionIndex: number) => {
		const newAnswers = [...selectedAnswers];
		newAnswers[currentQuestion] = optionIndex;
		setSelectedAnswers(newAnswers);
	};

	const handleNext = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			setShowResults(true);
		}
	};

	const calculateScore = () => {
		let correct = 0;
		questions.forEach((q, i) => {
			if (selectedAnswers[i] === q.correctAnswer) correct++;
		});
		return correct;
	};

  // Add this helper function (adjust maxWidth as needed)
const splitText = (text: string, maxWidth: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i];
    // Approximate width check (adjust scale factor based on your font)
    const testWidth = testLine.length * 0.5; // Rough estimate
    if (testWidth > maxWidth) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  return lines;
};
	const handleDownloadPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
  
      // // Load Arabic font if needed
      // const font = language === "en" 
      //   ? StandardFonts.Helvetica 
      //   : await pdfDoc.embedFont(StandardFonts.Helvetica);
  
      // Add title
      const title = language === "en" ? "Quiz Results" : "نتائج الاختبار";
      page.drawText(title, { x: 50, y: height - 50, size: 20,  });
  
      // Add score
      const score = calculateScore();
      const percentage = (score / questions.length) * 100;
      page.drawText(`${percentage.toFixed(1)}% (${score}/${questions.length})`, {
        x: 50,
        y: height - 80,
        size: 16,
        
      });
  
      // Add questions/answers with line wrapping
      let yPosition = height - 120;
      questions.forEach((q, index) => {
        const questionLines = splitText(`${index + 1}. ${q.question}`, width - 100);
        questionLines.forEach(line => {
          page.drawText(line, { x: 50, y: yPosition, size: 10 });
          yPosition -= 20;
        });
  
        const answerText = `${language === "en" ? "Correct: " : "صح: "}${q.options[q.correctAnswer]}`;
        page.drawText(answerText, {
          x: 70,
          y: yPosition,
          size: 9,
          color: rgb(0, 0.5, 0),
         
        });
        yPosition -= 30;
      });
  
      // Download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'quiz-results.pdf';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("PDF failed:", error);
      alert(language === "en" ? "Download failed" : "فشل التحميل");
    }
  };

	if (showResults) {
		const score = calculateScore();
		const percentage = (score / questions.length) * 100;

		return (
			<div
				className={`min-h-screen ${
					theme === "dark" ? "bg-gray-900" : "bg-gray-50"
				} py-12`}
			>
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div
						className={`${
							theme === "dark" ? "bg-gray-800" : "bg-white"
						} rounded-xl shadow-lg p-8`}
					>
						<h2
							className={`text-3xl font-bold mb-8 text-center ${
								theme === "dark" ? "text-white" : "text-gray-900"
							}`}
						>
							{language === "en" ? "Quiz Results" : "نتائج الاختبار"}
						</h2>

						<div className="text-center mb-8">
							<div className="text-5xl font-bold text-purple-600 mb-2">
								{percentage.toFixed(1)}%
							</div>
							<p
								className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
							>
								{language === "en"
									? `You got ${score} out of ${questions.length} questions correct`
									: `لقد حصلت على ${score} من ${questions.length} إجابات صحيحة`}
							</p>
						</div>

						<div className="space-y-6">
							{/* Score Message */}
							<div className="text-center mb-8">
								<p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} italic`}>
									{scoreMessages.find(msg => percentage >= msg.range[0] && percentage <= msg.range[1])?.[language === "en" ? "en" : "ar"]}
								</p>
							</div>

							{/* Questions Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{questions.map((q, index) => (
									<div
										key={index}
										className={`border rounded-lg p-4 ${
											theme === "dark" ? "border-gray-700" : "border-gray-200"
										}`}
									>
										<div className="flex items-start space-x-2">
											{selectedAnswers[index] === q.correctAnswer ? (
												<CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
											) : (
												<XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
											)}
											<div className="flex-1">
												<p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
													{q.question}
												</p>
												<p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
													{language === "en" ? "Your answer: " : "إجابتك: "}
													<span className={selectedAnswers[index] === q.correctAnswer ? "text-green-500" : "text-red-500"}>
														{q.options[selectedAnswers[index]]}
													</span>
												</p>
												{selectedAnswers[index] !== q.correctAnswer && (
													<p className="text-sm text-green-600 mt-1">
														{language === "en" ? "Correct answer: " : "الإجابة الصحيحة: "}
														{q.options[q.correctAnswer]}
													</p>
												)}
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Download PDF Button */}
							<div className="mt-8 space-y-4">
								<p className={`text-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
									{language === "en" 
										? "Want to review these questions later? Download them as a PDF!"
										: "تريد مراجعة هذه الأسئلة لاحقاً؟ قم بتحميلها كملف PDF!"}
								</p>
								<div className="flex justify-center">
									<button
										onClick={() => handleDownloadPDF()}
										className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
									>
										<Download className="mr-2 h-5 w-5" />
										{language === "en" ? "Download Questions" : "تحميل الأسئلة"}
									</button>
								</div>
							</div>
						</div>

						<div className="mt-8 flex justify-center">
							<button
								onClick={() => navigate("/dashboard")}
								className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
							>
								{language === "en" ? "Create Another Quiz" : "إنشاء اختبار آخر"}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`min-h-screen ${
				theme === "dark" ? "bg-gray-900" : "bg-gray-50"
			} py-12`}
		>
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
				<div
					className={`${
						theme === "dark" ? "bg-gray-800" : "bg-white"
					} rounded-xl shadow-lg p-8`}
				>
					<div className="flex justify-between items-center mb-8">
						<h2
							className={`text-2xl font-bold ${
								theme === "dark" ? "text-white" : "text-gray-900"
							}`}
						>
							{language === "en"
								? `Question ${currentQuestion + 1}`
								: `السؤال ${currentQuestion + 1}`}
						</h2>
						<span
							className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
						>
							{currentQuestion + 1} {language === "en" ? "of" : "من"}{" "}
							{questions.length}
						</span>
					</div>

					<div className="mb-8">
						<p
							className={`text-lg mb-6 ${
								theme === "dark" ? "text-white" : "text-gray-900"
							}`}
						>
							{questions[currentQuestion].question}
						</p>

						<div className="space-y-3">
							{questions[currentQuestion].options.map((option, index) => (
								<button
									key={index}
									onClick={() => handleAnswerSelect(index)}
									className={`w-full text-left p-4 rounded-lg border transition-all ${
										selectedAnswers[currentQuestion] === index
											? "border-purple-600 bg-purple-50 text-purple-700"
											: theme === "dark"
											? "border-gray-700 text-gray-300 hover:border-purple-400"
											: "border-gray-200 text-gray-700 hover:border-purple-300"
									}`}
								>
									{option}
								</button>
							))}
						</div>
					</div>

					<div className="flex justify-between">
						{currentQuestion > 0 && (
							<button
								onClick={() => setCurrentQuestion(currentQuestion - 1)}
								className={`flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
									theme === "dark" ? "focus:ring-offset-gray-900" : ""
								}`}
							>
								<ChevronLeft className="mr-2 h-5 w-5" />
								{language === "en" ? "Back" : "رجوع"}
							</button>
						)}
						<button
							onClick={handleNext}
							disabled={selectedAnswers[currentQuestion] === undefined}
							className={`flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
								theme === "dark" ? "focus:ring-offset-gray-900" : ""
							}`}
						>
							{currentQuestion === questions.length - 1
								? language === "en"
									? "Show Results"
									: "عرض النتائج"
								: language === "en"
								? "Next"
								: "التالي"}
							<ChevronRight className="ml-2 h-5 w-5" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Quiz;
