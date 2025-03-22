import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, CheckCircle, XCircle } from 'lucide-react'
import { useTheme } from '../lib/context/ThemeContext'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

function Quiz() {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, language } = useTheme()
  const questions = location.state?.questions as Question[]
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  
  if (!questions) {
    navigate('/dashboard')
    return null
  }

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = optionIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) correct++
    })
    return correct
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = (score / questions.length) * 100

    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
            <h2 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {language === 'en' ? 'Quiz Results' : 'نتائج الاختبار'}
            </h2>
            
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                {percentage.toFixed(1)}%
              </div>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {language === 'en'
                  ? `You got ${score} out of ${questions.length} questions correct`
                  : `لقد حصلت على ${score} من ${questions.length} إجابات صحيحة`
                }
              </p>
            </div>

            <div className="space-y-6">
              {questions.map((q, index) => (
                <div key={index} className={`border rounded-lg p-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-start space-x-2">
                    {selectedAnswers[index] === q.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {q.question}
                      </p>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {language === 'en' ? 'Your answer: ' : 'إجابتك: '}
                        {q.options[selectedAnswers[index]]}
                      </p>
                      {selectedAnswers[index] !== q.correctAnswer && (
                        <p className="text-sm text-green-600 mt-1">
                          {language === 'en' ? 'Correct answer: ' : 'الإجابة الصحيحة: '}
                          {q.options[q.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {language === 'en' ? 'Create Another Quiz' : 'إنشاء اختبار آخر'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {language === 'en' ? `Question ${currentQuestion + 1}` : `السؤال ${currentQuestion + 1}`}
            </h2>
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
              {currentQuestion + 1} {language === 'en' ? 'of' : 'من'} {questions.length}
            </span>
          </div>

          <div className="mb-8">
            <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {questions[currentQuestion].question}
            </p>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : theme === 'dark'
                        ? 'border-gray-700 text-gray-300 hover:border-purple-400'
                        : 'border-gray-200 text-gray-700 hover:border-purple-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className={`flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                theme === 'dark' ? 'focus:ring-offset-gray-900' : ''
              }`}
            >
              {currentQuestion === questions.length - 1 
                ? (language === 'en' ? 'Finish' : 'إنهاء')
                : (language === 'en' ? 'Next' : 'التالي')
              }
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz