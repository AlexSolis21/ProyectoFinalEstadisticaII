import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { HomePage } from "./HomePage";

const theme = createTheme({
  palette: {
    background: {
      default: grey[300],
      paper: "#FFFFFF",
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
};
