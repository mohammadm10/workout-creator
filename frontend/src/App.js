import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './App.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const muscle = ['Chest', 'Back', 'Shoulders', 'Legs', 'Biceps', 'Triceps', 'Rear Delts', 'Traps', 'Front Delts', 'Side Delts', 'Quads', 'Hamstrings', 'Calves'];
  const level = ['Beginner', 'Intermediate', 'Advanced'];
  const goals = ['Weightloss', 'Maintain', 'Build Muscle'];

  const [muscleSelect, setMuscleSelect] = useState('');
  const [levelSelect, setLevelSelect] = useState('');
  const [goalSelect, setGoalSelect] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true); // Start loading animation

    const url = `http://localhost:3001/${muscleSelect}/${levelSelect}/${goalSelect}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Print the received data to the console
        setIsLoading(false); // Stop loading animation
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false); // Stop loading animation
      });
  };

  const handleMuscleSelect = (event) => {
    setMuscleSelect(event.target.value);
  }

  const handleExperienceSelect = (event) => {
    setLevelSelect(event.target.value);
  }

  const handleGoalChange = (event) => {
    setGoalSelect(event.target.value);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <div>
          <h1 className=' lg:text-xl sm:text-md font-mono font-bold relative p-5'>
            <a href='https://mohammadm-portfolio.vercel.app/' target='_blank' rel='noopener noreferrer'>
              developedbyMoe
            </a>
          </h1>
        </div>
        <div className=' font-serif flex justify-center items-end text-3xl h-[10rem]'>
          <h1>Welcome to your personal gym trainer!</h1>
        </div>
        <div className=' font-serif flex justify-center py-5 text-xl'>
          <h2>Please fill in the fields below and I will create your next exercise!</h2>
        </div>
        <div className=' flex justify-center'>
          <FormControl sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="muscle-label">Muscle</InputLabel>
            <Select
              labelId="muscle-label"
              label="Muscle"
              value={muscleSelect}
              onChange={handleMuscleSelect}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 190, // Set the maximum height for the dropdown menu
                  },
                },
              }}
            >
              {muscle.map((muscleName, index) => (
                <MenuItem key={index} value={muscleName}>{muscleName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="level-label">Gym Experience</InputLabel>
            <Select
              labelId="level-label"
              label="Gym Experience"
              value={levelSelect}
              onChange={handleExperienceSelect}
            >
              {level.map((levelName, index) => (
                <MenuItem key={index} value={levelName}>{levelName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="goal-label">Gym Goal</InputLabel>
            <Select
              labelId="goal-label"
              label="Gym Goal"
              value={goalSelect}
              onChange={handleGoalChange}
            >
              {goals.map((goalsName, index) => (
                <MenuItem key={index} value={goalsName}>{goalsName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className=' py-7 flex justify-center'>
          <Button onClick={handleSubmit} variant="outlined">Create Exercise</Button>
        </div>
        <div>
            <div className=' flex justify-center'>
              <img className={`loading-image ${isLoading ? 'show' : 'hide'} lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] sm:w-[200px] sm:h-[200px]`}
                src="/muscle.png"
                alt="Loading"
              />
            </div>
            {isLoading && (

            <div className='flex justify-center'>
              <div className="flex items-center justify-center py-10">
                <p className="text-xl font-semibold">Loading</p>
                <div className="ml-2 animate-pulse flex justify-between">
                  <div className="w-3 h-3 bg-white rounded-full mr-1"></div>
                  <div className="w-3 h-3 bg-white rounded-full mr-1"></div>
                  <div className="w-3 h-3 bg-white rounded-full mr-1"></div>
                  <div className="w-3 h-3 bg-white rounded-full mr-1"></div>
                </div>
              </div>
            </div>
            )}
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
