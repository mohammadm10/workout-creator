import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Select, MenuItem, FormControl, InputLabel, Button, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import './App.css'
import Form from './content/Form';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [workoutSelect, setWorkoutSelect] = useState('');

  const handleSelectionSingle = () => {
    setWorkoutSelect('single');
  }

  const handleSelectionWhole = () => {
    setWorkoutSelect('whole');
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
        <div className=' font-serif flex justify-center items-end text-3xl text-center h-[8rem]'>
          <h1>Welcome to your personal gym trainer!</h1>
        </div>
        <div className=' font-serif flex justify-center py-5 text-xl text-center'>
          <h2>Please fill in the fields below and I will create your exercises.</h2>
        </div>
        <div className=' flex justify-center'>
          <div className=' py-10 mr-10'>
            <Button style={{ width: '200px' }} onClick={handleSelectionSingle} variant="contained">Single Exercise</Button>
          </div>
          <div className=' py-10 ml-10'>
            <Button style={{ width: '200px' }} onClick={handleSelectionWhole} variant="contained">Entire Workout Plan</Button>
          </div>
        </div>
        <div>
          <Form />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
