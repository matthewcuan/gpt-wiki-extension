import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

async function generateSummary(topic) {
    const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.openai.com/v1/chat/completions/gpt-3.5-turbo", {
      method: "POST",
      headers: {
        "Authorization": "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: `Summarize ${topic}`,
        max_tokens: 100
      })
    });
  
    const data = await response.json();
  
    if (response.ok) {
      return data.choices[0].text;
    } else {
      throw new Error(data.error.message);
    }
  }
  