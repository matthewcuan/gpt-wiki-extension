import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateSummary(topic) {
  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `Generate a summary for ${topic}`,
    });

    return completion.data.choices[0].text;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
