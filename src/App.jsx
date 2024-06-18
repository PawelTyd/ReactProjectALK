import { ThemeProvider } from "./providers/ThemeProvider";
import { Router } from "./components";

function App() {
  return (
    <div id="app">
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
