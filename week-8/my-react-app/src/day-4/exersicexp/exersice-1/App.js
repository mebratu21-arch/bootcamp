// App.js
import ThemeProvider from "./ThemeProvider";
import ThemeSwitcher from "./ThemeSwitcher";

function App() {
  return (
    <ThemeProvider>
      <h1>Theme Switcher Example</h1>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}

export default App;
