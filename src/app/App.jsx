import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import TrashBinPage from "./pages/TrashBinPage";
import { NotesProvider } from "../features/notes/context/NotesContext";
import { TrashNotesProvider } from "../features/trash/context/TrashNotesContext";
import { useEffect, useState } from "react";

function App() {
  // Theme state (light/dark)
  const [modes, setModes] = useState(localStorage.getItem("Modes") || "dark");

  // Apply theme to document
  useEffect(() => {
    localStorage.setItem("Modes", modes);
    if (modes === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [modes]);

  return (
    // Wrap the app with notes and trash context providers
    <NotesProvider>
      <TrashNotesProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<NotesPage modes={modes} setModes={setModes} />}
            />
            <Route path="/trashbin" element={<TrashBinPage />} />
          </Routes>
        </BrowserRouter>
      </TrashNotesProvider>
    </NotesProvider>
  );
}

export default App;
