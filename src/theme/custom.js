import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';


const customTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: red[500]
    },
    secondary: {
      main: yellow["A400"]
    },
    typography: {
      fontFamily: [
        '"Orbitron"',
        '"Roboto"', 
        '"Helvetica"', 
        '"Arial"', 
        'sans-serif'
      ].join(',')
    }
  }
});

export default customTheme;