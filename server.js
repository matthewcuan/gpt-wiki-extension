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

app.post('/api/summarize', async (req, res) => {
    if (!configuration.apiKey) {
        res.status(500).json({
          error: {
            message: "OpenAI API key not configured, please follow instructions in README.md",
          }
        });
        return;
      }
    
    console.log(req.body.intro)
    const intro = req.body.intro || '';
    
    try {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Summarize the following into two short bullet points: ${intro}. Return it in html format`,
        temperature: 0.6,
        max_tokens: 80
    });
    console.log(completion.data.choices[0].text)
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

const port = 3000; // Choose the desired port number
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
