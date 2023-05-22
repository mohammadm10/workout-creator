import express, { json, Request, Response } from 'express';
import { errorHandler } from './middleware/error';
import { NotFoundHandler } from './middleware/notFound';
import cors from 'cors';
import { config } from './config';
import fetch from 'isomorphic-fetch';


const app = express();
app.use(cors());

app.get('/:muscleSelect/:levelSelect/:goalSelect', async (req: Request, res: Response) => {
  const muscleGroup = req.params.muscleSelect;
  const level = req.params.levelSelect;
  const goal = req.params.goalSelect;
  const prompt = `Please provide me an exercise to do at the gym given the following information: 
                The muscle I want to train is ${muscleGroup}, my gym experience is ${level} and my fitness goal is ${goal}`;
  const apiKey = config.apiKey
  const model = 'gpt-3.5-turbo';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: prompt }],
      }),
    });

    const data = await response.json();
    console.log('API Response:', data);

    if (data.choices && data.choices.length > 0) {
      const message = data.choices[0].message.content.trim();
      console.log(message);
      
      res.setHeader('Content-Type', 'application/json');
      res.json({ message });
    } else {
      res.status(500).json({ error: 'Unexpected response from OpenAI API' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.use(NotFoundHandler);
app.use(errorHandler);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
