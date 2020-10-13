import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: red[500]
    },
    secondary: {
      main: yellow["A400"]
    }
  },
  typography: {
    fontWeightBold: 800,
    fontWeightLight: 400,
    fontWeightMedium: 600,
    fontWeightRegular: 500,
    fontFamily: [
      '"Orbitron"',
      //'"Roboto"', 
      '"Helvetica"', 
      '"Arial"', 
      'sans-serif'
    ].join(',')
  }
});

export default theme;