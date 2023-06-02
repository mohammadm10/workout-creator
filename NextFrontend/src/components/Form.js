import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button, useMediaQuery } from '@mui/material';
import showError from './swal';

export default function Form() {

    const muscle = ['Chest', 'Back', 'Shoulders', 'Legs', 'Biceps', 'Triceps', 'Rear Delts', 'Traps', 'Front Delts', 'Side Delts', 'Quads', 'Hamstrings', 'Calves', 'Abs'];
    const level = ['Beginner', 'Intermediate', 'Advanced'];
    const goals = ['Weightloss', 'Maintain', 'Build Muscle'];

    const [muscleSelect, setMuscleSelect] = useState('');
    const [levelSelect, setLevelSelect] = useState('');
    const [goalSelect, setGoalSelect] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [reply, setReply] = useState('');

    const isMobile = useMediaQuery("(max-width: 700px)");

    function checkFields() {
        if (!muscleSelect || !levelSelect || !goalSelect) {
            return 0;
        }
        return 1;
    }

    const handleSubmit = async () => {
        let check = checkFields();

        if (check === 0) {
            showError();
        } else {
            setIsLoading(true); // Start loading animation

            const url = `/api/${muscleSelect}/${levelSelect}/${goalSelect}`;

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data); // Print the received data to the console
                    setIsLoading(false); // Stop loading animation
                    setReply(data.message);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false); // Stop loading animation
                });
        }
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
        <>
            <div className={`font-serif px-10 flex py-5 ${isMobile ? 'flex-col' : 'justify-center'}`}>
                <FormControl sx={{ m: 1, minWidth: 160, width: '100%' }}>
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
                <FormControl sx={{ m: 1, minWidth: 160, width: '100%' }}>
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
                <FormControl sx={{ m: 1, minWidth: 160, width: '100%' }}>
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
                <Button style={{ width: '200px', height: '48px' }} onClick={handleSubmit} variant="outlined">Create Exercise</Button>
            </div>
            <div>
                {isLoading ? (
                    <div className='flex justify-center'>
                        <img
                            className=' animate-spin lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] sm:w-[200px] sm:h-[200px]'
                            src="/muscle.png"
                            alt="Loading"
                        />
                    </div>
                ) : (
                    <div className='font-serif px-10 flex justify-center text-center'>
                        <div className={`py-5 ${isMobile ? 'w-[100%]' : 'w-[75%]'}`} style={{ whiteSpace: 'pre-wrap' }}>{reply}</div>
                    </div>
                )}

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
        </>
    )
}