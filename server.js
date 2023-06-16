import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";


const app = express();
app.use(express.json());
app.use(cors());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

// Summartize given input
app.post('/api/summarize', async (req, res) => {
    if (!configuration.apiKey) {
        res.status(500).json({
          error: {
            message: "OpenAI API key not configured, please follow instructions in README.md",
          }
        });
        return;
      }
    
    const intro = req.body.intro || '';
    
    try {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Summarize the following into two short bullet points: ${intro}. Add a <br> tag after each bullet point`,
        temperature: 0.6,
        max_tokens: 100
    });
    res.status(200).json({ result: completion.data.choices[0].text });
    } catch(error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
            error: {
                message: 'An error occurred during your request.',
            }
            });
        }
    }
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
