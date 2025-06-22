import { createContext, useState } from "react";

// Context provider to manage and share Notes state across the app
export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("Notes")) || []
  );

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
}
