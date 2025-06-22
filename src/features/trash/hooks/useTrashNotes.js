import { useContext } from "react";
import { TrashNotesContext } from "../context/TrashNotesContext";

// Custom hook to access trash notes context
export default function useTrashNotes() {
  return useContext(TrashNotesContext);
}
