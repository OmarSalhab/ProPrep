import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
})

export const generateQuiz = async (text: string) => {
  try {
    const prompt = `Based on the following text, create 15 multiple-choice questions with 4 options each. Format the response as a JSON object with a 'questions' array where each question object has the following structure:
    {
      "question": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0
    }

    Text: ${text}

    Remember to:
    1. Make questions that test understanding, not just memorization
    2. Ensure all options are plausible
    3. Distribute correct answers evenly
    4. Keep questions clear and concise`

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    })

    if (!response.choices[0].message.content) {
      throw new Error('No content in response')
    }

    const result = JSON.parse(response.choices[0].message.content)
    
    if (!result.questions || !Array.isArray(result.questions)) {
      throw new Error('Invalid response format')
    }

    return result.questions
  } catch (error) {
    console.error('Error generating quiz:', error)
    throw new Error('Failed to generate quiz. Please try again.')
  }
}