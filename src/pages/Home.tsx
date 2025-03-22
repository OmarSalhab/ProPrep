import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  ChevronDown,
  LogOut,
  Settings,
  User,
  FileText,
  Brain,
  PenTool,
  Target,
  Award,
  HelpCircle,
  X,
  Sun,
  Moon,
  Languages,
  Sparkles,
  Zap,
  BookOpenCheck,
  GraduationCap,
  Clock
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useTheme } from '../lib/context/ThemeContext'

function Home() {
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [userName, setUserName] = useState('')
  const [showTutorial, setShowTutorial] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(1)
  const { theme, language, toggleTheme, setLanguage } = useTheme()

  useEffect(() => {
    checkAuth()
    fetchUserProfile()
    const isFirstVisit = !localStorage.getItem('tutorialComplete')
    if (isFirstVisit) {
      setShowTutorial(true)
      localStorage.setItem('tutorialComplete', 'true')
    }
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/login')
    }
  }

  const fetchUserProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', session.user.id)
        .single()

      if (profile) {
        setUserName(profile.name)
      }
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const howToSteps = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: language === 'en' ? 'Input Your Content' : 'أدخل المحتوى',
      description: language === 'en' 
        ? 'Upload a PDF or paste your text directly into the editor'
        : 'قم بتحميل ملف PDF أو لصق النص مباشرة في المحرر'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: language === 'en' ? 'AI Processing' : 'معالجة الذكاء الاصطناعي',
      description: language === 'en'
        ? 'Our AI analyzes your content and generates relevant questions'
        : 'يقوم الذكاء الاصطناعي لدينا بتحليل المحتوى وإنشاء أسئلة ذات صلة'
    },
    {
      icon: <BookOpenCheck className="h-8 w-8" />,
      title: language === 'en' ? 'Review & Customize' : 'مراجعة وتخصيص',
      description: language === 'en'
        ? 'Review the generated questions and customize as needed'
        : 'راجع الأسئلة المولدة وقم بتخصيصها حسب الحاجة'
    }
  ]

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: language === 'en' ? 'Instant Generation' : 'توليد فوري',
      description: language === 'en'
        ? 'Create comprehensive quizzes in seconds'
        : 'إنشاء اختبارات شاملة في ثوانٍ'
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: language === 'en' ? 'Smart Learning' : 'التعلم الذكي',
      description: language === 'en'
        ? 'AI-powered questions that test understanding'
        : 'أسئلة مدعومة بالذكاء الاصطناعي تختبر الفهم'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: language === 'en' ? 'Time Saving' : 'توفير الوقت',
      description: language === 'en'
        ? 'Save hours of manual question creation'
        : 'وفر ساعات من إنشاء الأسئلة اليدوية'
    }
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <h1 className={`ml-3 text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ProPrep
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <Languages className="h-5 w-5" />
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {language === 'en' ? 'Go to Dashboard' : 'الذهاب إلى لوحة التحكم'}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-white hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'}`}
                >
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span>{userName}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    {/* User menu items */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* How to Generate a Quiz Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {language === 'en' ? 'How to Generate a Quiz' : 'كيفية إنشاء اختبار'}
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'en' 
                ? 'Create professional quizzes in three simple steps'
                : 'إنشاء اختبارات احترافية في ثلاث خطوات بسيطة'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howToSteps.map((step, index) => (
              <div
                key={index}
                className={`${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                } rounded-xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-purple-600 mb-4">{step.icon}</div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {step.title}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {language === 'en' ? 'Powerful Features' : 'ميزات قوية'}
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'en'
                ? 'Everything you need to create perfect quizzes'
                : 'كل ما تحتاجه لإنشاء اختبارات مثالية'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the existing sections with dark mode and RTL support */}
      {/* ... */}

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } rounded-xl p-8 max-w-md animate-fade-in`}>
            {/* Tutorial content */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home