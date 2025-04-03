import { ThemeProvider, useTheme } from "./themeContext";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? "Modo Claro" : "Modo Escuro"}
    </button>
  );
};

const App = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      <h1>App com tema {isDarkMode ? "escuro" : "claro"}</h1>
      <ThemeToggleButton />
    </div>
  );
};

const Root = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default Root;
