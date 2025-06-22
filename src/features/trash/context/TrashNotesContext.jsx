import { createContext, useState } from "react";

// Context for managing trash notes
export const TrashNotesContext = createContext();

export function TrashNotesProvider({ children }) {
  const [trashNotes, setTrashNotes] = useState(
    JSON.parse(localStorage.getItem("trashNotes")) || []
  );

  return (
    <TrashNotesContext.Provider value={{ trashNotes, setTrashNotes }}>
      {children}
    </TrashNotesContext.Provider>
  );
}
