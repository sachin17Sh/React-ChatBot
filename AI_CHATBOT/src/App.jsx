import "./App.css"
import ChatComponent from "./components/ChatComponent"
import { MUI_C } from "./lib/MaterialUI"
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

function App() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <>
      <MUI_C.Box
        sx={{
          display: 'flex',        
          flexDirection: 'column', 
          justifyContent: 'flex-end', 
          height: '100vh',        
          width: '100%',       
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        <ChatComponent />
        <MUI_C.FormControl>
          <MUI_C.FormLabel id="demo-theme-toggle">Change Mode</MUI_C.FormLabel>
          <MUI_C.RadioGroup
            aria-labelledby="demo-theme-toggle"
            name="theme-toggle"
            row
            value={mode}
            onChange={(event) => setMode(event.target.value)}
          >
            <MUI_C.FormControlLabel value="light" control={<MUI_C.Radio />} label="Light" />
            <MUI_C.FormControlLabel value="dark" control={<MUI_C.Radio />} label="Dark" />
          </MUI_C.RadioGroup>
        </MUI_C.FormControl>
      </MUI_C.Box>
    </>
  );
}

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function ToggleColorMode() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
