function cleanJsonText(text: string) {
	// Remove the starting ```json and ending ```
	return text.replace(/^```json\s*/, "").replace(/\s*```$/, "");
	
}

export const generateQuiz = async (text: string) => {
	
	const prompt = `Based on the following text, create 10 multiple-choice questions with 4 options each. Format the response as a JSON object(start the response with curly line only "{" and end it with the curly line "}" only dont put any  or mention json) with a 'questions' array where each question object has the following structure:
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
    4. Keep questions clear and concise
	5. correctAnswer: should be between 0-3
    `;

	try {
		const response = await fetch(`http://localhost:3001/v1/chat/completions`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				model: "gemma3:4b",
				messages: [{ role: "user", content: prompt }],
			}),
		});
		console.log(response);
		
		const badData = await response.json();

		const data = cleanJsonText(badData.choices[0].message.content);
		console.log(typeof data, data);

		if (!data) {
			throw new Error("No content in response");
		}

		const result = JSON.parse(data);
		console.log(typeof result, result);
		if (!result.questions || !Array.isArray(result.questions)) {
			throw new Error("Invalid response format");
		}

		return result.questions;
	} catch (error) {
		console.error("Error generating quiz:", error);
		throw new Error("Failed to generate quiz. Please try again.");
	}
};
