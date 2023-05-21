import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <div>
          <h1>Hello!</h1>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
