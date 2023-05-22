import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const muscle = ['Chest', 'Back', 'Shoulders', 'Legs', 'Biceps', 'Triceps', 'Rear Delts', 'Traps', 'Front Delts', 'Side Delts', 'Quads', 'Hamstrings', 'Calves'];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <div className=' font-serif flex justify-center items-end text-3xl h-[10rem]'>
          <h1>Welcome to your personal gym trainer!</h1>
        </div>
        <div className=' font-serif flex justify-center py-5 text-xl'>
          <h2>Please fill in the fields below and I will create your next exercise!</h2>
        </div>
        <div className=' flex justify-center'>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="muscle-label">Muscle</InputLabel>
            <Select
              labelId="muscle-label"
              label="Muscle"
            >
              {muscle.map((muscleName, index) => (
                <MenuItem key={index} value={muscleName}>{muscleName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
