import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import blue from '@material-ui/core/colors/blue'


const theme = createMuiTheme({
  background: {
    default: "#071834"
  },
  palette: {
    type: 'dark',
    primary: {
      main: red[500]
    },
    secondary: {
      main: yellow["A400"]
    },
    info: {
      main: blue[500]
    }
  },
  typography: {
    fontWeightBold: 800,
    fontWeightLight: 400,
    fontWeightMedium: 600,
    fontWeightRegular: 500,
    fontFamily: [
      '"Montserrat"',
      //'"Roboto"', 
      '"Helvetica"', 
      '"Arial"', 
      'sans-serif'
    ].join(',')
  }
});

export default theme;