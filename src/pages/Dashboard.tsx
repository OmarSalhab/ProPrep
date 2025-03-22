import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Upload,
  FileText,
  AlertCircle,
  Loader2,
  BookOpen,
  LogOut,
  Settings,
  User,
  ChevronDown,
  FileUp,
  Type,
  Globe,
  Sparkles,
  Clock,
  CheckCircle,
  Sun,
  Moon,
  Languages
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { generateQuiz } from '../lib/openai'
import { readPDF } from '../lib/pdfReader'
import { useTheme } from '../lib/context/ThemeContext'

function Dashboard() {
  const navigate = useNavigate()
  const { theme, language, toggleTheme, setLanguage } = useTheme()
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userName, setUserName] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [inputMethod, setInputMethod] = useState<'text' | 'file'>('text')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchUserProfile()
  }, [])

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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files?.length) {
      await handleFileSelection(files[0])
    }
  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.length) {
      await handleFileSelection(files[0])
    }
  }

  const handleFileSelection = async (file: File) => {
    setError('')
    if (file.type !== 'application/pdf') {
      setError(language === 'en' ? 'Please upload a PDF file' : 'يرجى تحميل ملف PDF')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError(language === 'en' ? 'File size should be less than 10MB' : 'يجب أن يكون حجم الملف أقل من 10 ميجابايت')
      return
    }
    setLoading(true)
    try {
      const extractedText = await readPDF(file)
      setText(extractedText)
      setFile(file)
    } catch (err) {
      setError(language === 'en' ? 'Failed to read PDF file. Please try again.' : 'فشل في قراءة ملف PDF. حاول مرة اخرى.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!text.trim()) {
      setError(language === 'en' 
        ? 'Please enter some text or upload a PDF to generate a quiz'
        : 'الرجاء إدخال نص أو تحميل ملف PDF لإنشاء اختبار'
      )
      return
    }

    if (text.length < 200) {
      setError(language === 'en'
        ? 'Please provide at least 200 characters of text'
        : 'يرجى توفير 200 حرف على الأقل من النص'
      )
      return
    }

    setLoading(true)
    try {
      const questions = await generateQuiz(text)
      navigate('/quiz', { state: { questions } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the quiz')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: language === 'en' ? "AI-Powered Generation" : "توليد بالذكاء الاصطناعي",
      description: language === 'en' ? "Advanced AI creates relevant and challenging questions" : "يقوم الذكاء الاصطناعي المتقدم بإنشاء أسئلة ذات صلة وتحديات"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: language === 'en' ? "Quick Creation" : "إنشاء سريع",
      description: language === 'en' ? "Generate comprehensive quizzes in seconds" : "إنشاء اختبارات شاملة في ثوانٍ"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: language === 'en' ? "Multiple Formats" : "تنسيقات متعددة",
      description: language === 'en' ? "Support for text input and PDF uploads" : "دعم إدخال النص وتحميلات PDF"
    }
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <h1 className={`ml-3 text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>ProPrep</h1>
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
                  <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <button
                      onClick={() => {/* TODO: Implement profile settings */}}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-purple-50'
                      }`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Profile' : 'الملف الشخصي'}
                    </button>
                    <button
                      onClick={() => {/* TODO: Implement settings */}}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-purple-50'
                      }`}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Settings' : 'الإعدادات'}
                    </button>
                    <button
                      onClick={handleSignOut}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-purple-50'
                      }`}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Sign Out' : 'تسجيل الخروج'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? 'AI Quiz Generator' : 'مولد الاختبارات بالذكاء الاصطناعي'}
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            {language === 'en'
              ? 'Transform your content into engaging quizzes in seconds. Upload a PDF or paste your text to get started.'
              : 'حول المحتوى الخاص بك إلى اختبارات جذابة في ثوانٍ. قم بتحميل ملف PDF أو لصق النص للبدء.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
              <div className="text-purple-600 mb-4">{feature.icon}</div>
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
          {error && (
            <div className="mb-6 flex items-center p-4 text-red-700 bg-red-50 rounded-lg">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setInputMethod('text')}
              className={`flex-1 flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
                inputMethod === 'text'
                  ? 'border-purple-600 bg-purple-50 text-purple-600'
                  : `border-gray-200 ${theme === 'dark' ? 'hover:border-purple-400' : 'hover:border-purple-300'}`
              }`}
            >
              <Type className="h-5 w-5 mr-2" />
              {language === 'en' ? 'Text Input' : 'إدخال النص'}
            </button>
            <button
              onClick={() => setInputMethod('file')}
              className={`flex-1 flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
                inputMethod === 'file'
                  ? 'border-purple-600 bg-purple-50 text-purple-600'
                  : `border-gray-200 ${theme === 'dark' ? 'hover:border-purple-400' : 'hover:border-purple-300'}`
              }`}
            >
              <FileUp className="h-5 w-5 mr-2" />
              {language === 'en' ? 'PDF Upload' : 'تحميل PDF'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {inputMethod === 'text' ? (
              <div className="space-y-2">
                <label htmlFor="text" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  {language === 'en' ? 'Enter your text' : 'أدخل النص'}
                </label>
                <textarea
                  id="text"
                  rows={8}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={language === 'en' 
                    ? "Enter at least 200 characters of text to generate a quiz..."
                    : "أدخل 200 حرف على الأقل من النص لإنشاء اختبار..."
                  }
                  className={`block w-full rounded-lg shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{text.length} {language === 'en' ? 'characters' : 'حرف'}</span>
                  <span>
                    {text.length >= 200 
                      ? <CheckCircle className="h-4 w-4 text-green-500" />
                      : language === 'en' ? '200 characters minimum' : 'الحد الأدنى 200 حرف'
                    }
                  </span>
                </div>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  dragActive
                    ? 'border-purple-600 bg-purple-50'
                    : `${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`
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
                    <FileText className={`h-12 w-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-purple-600 hover:text-purple-700 font-medium focus:outline-none"
                    >
                      {language === 'en' ? 'Click to upload' : 'انقر للتحميل'}
                    </button>
                    {' '}{language === 'en' ? 'or drag and drop' : 'أو اسحب وأفلت'}
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'en' ? 'PDF files only (max 10MB)' : 'ملفات PDF فقط (الحد الأقصى 10 ميجابايت)'}
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
                theme === 'dark' ? 'focus:ring-offset-gray-900' : ''
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  {language === 'en' ? 'Generating Quiz...' : 'جاري إنشاء الاختبار...'}
                </>
              ) : (
                language === 'en' ? 'Generate Quiz' : 'إنشاء اختبار'
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Dashboard