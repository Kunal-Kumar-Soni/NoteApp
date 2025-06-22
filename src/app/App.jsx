import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import TrashBinPage from "./pages/TrashBinPage";
import { NotesProvider } from "../features/notes/context/NotesContext";
import { TrashNotesProvider } from "../features/trash/context/TrashNotesContext";

function App() {
  return (
    // Wrap the app with notes and trash context providers
    <NotesProvider>
      <TrashNotesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NotesPage />} />
            <Route path="/trashbin" element={<TrashBinPage />} />
          </Routes>
        </BrowserRouter>
      </TrashNotesProvider>
    </NotesProvider>
  );
}

export default App;
