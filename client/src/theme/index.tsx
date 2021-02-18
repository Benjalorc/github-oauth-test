import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    warning: {
      main: '#ff9800'
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50'
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;