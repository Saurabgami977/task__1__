import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider
} from '@material-ui/core';

import Appbar from '../components/Appbar';
import Body from '../components/Body';
import './App.css';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#08f7fe'
    },
    common: {
      white: '#fff',
      black: '#000'
    }
  }
})

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Appbar />
        <Body />
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
