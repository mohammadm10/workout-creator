export default async function handler(req, res) {
    console.log("req.query", req.query)
    const { muscleSelect, levelSelect, goalSelect } = req.query
    const prompt = `Please provide me 4-6 exercises to do at the gym in a numbered format given the following information: 
                The muscle I want to train is ${muscleSelect}, my gym experience is ${levelSelect} and my fitness goal is ${goalSelect}.
                Also provide me the number of sets and reps to do based off of my fitness goal and experience.
                Number exercises as follows: 1. , 2. , etc. Briefly describe each workout and provide 1 tip for each one, in the form Tip: . For each workout, include
                all text in a single paragraph`;
    const model = 'gpt-3.5-turbo';
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_KEY}`,
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
            res.status(200).json({ message });
        } else {
            res.status(500).json({ error: 'Unexpected response from OpenAI API' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error ocurred: ' });
        console.error(error);
    }
}