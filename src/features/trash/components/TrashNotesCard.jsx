import { MdRestore, MdDeleteForever } from "react-icons/md";
import useNotes from "../../notes/hooks/useNotes";
import useTrashNotes from "../hooks/useTrashNotes";
import { toast } from "react-toastify";

function TrashNotesCard({
  trashNote,
  setIsTrashViewModalOpen,
  setTrashViewModalId,
  setIsTrashDeleteModalOpen,
  setTrashDeleteModalId,
}) {
  const { setNotes } = useNotes();
  const { trashNotes, setTrashNotes } = useTrashNotes();

  // Open view modal for selected trash note
  const handleOpenTrashModal = () => {
    setIsTrashViewModalOpen(true);
    setTrashViewModalId(trashNote.id);
  };

  // Restore note from trash
  const handleRestoreFn = (e) => {
    e.stopPropagation();
    const selectedNote = trashNotes.find((note) => note.id === trashNote.id);
    setNotes((prev) => [...prev, selectedNote]);
    const filteredTrash = trashNotes.filter((note) => note.id !== trashNote.id);
    setTrashNotes(filteredTrash);
    localStorage.setItem("trashNotes", JSON.stringify(filteredTrash));
    toast.info("Note restored");
  };

  // Trigger delete confirmation modal
  const handleDeleteFn = (e) => {
    e.stopPropagation();
    setTrashDeleteModalId(trashNote.id);
    setIsTrashDeleteModalOpen(true);
  };

  return (
    <div
      onClick={handleOpenTrashModal}
      className="relative bg-white dark:bg-slate-800 shadow-md hover:shadow-lg px-6 pt-4 pb-8 border border-slate-200 dark:border-slate-700 rounded-2xl min-h-[180px] overflow-hidden text-slate-800 dark:text-white transition-all duration-300 ease-in-out cursor-pointer select-none"
    >
      <h2 className="z-10 mb-2 font-semibold text-sky-600 dark:text-sky-400 text-xl line-clamp-1">
        {trashNote?.title?.split(" ").length > 7
          ? trashNote.title.split(" ").slice(0, 7).join(" ").toUpperCase()
          : trashNote?.title?.toUpperCase() || "UNTITLED NOTE"}
      </h2>

      <p className="z-10 relative text-base line-clamp-3 leading-relaxed">
        {trashNote?.paragraph?.split(" ").length > 30
          ? trashNote.paragraph.split(" ").slice(0, 30).join(" ") + "..."
          : trashNote.paragraph || "No content in this deleted note."}
      </p>

      <div className="right-3 bottom-2.5 z-10 absolute flex flex-wrap items-center gap-2">
        <button
          onClick={handleRestoreFn}
          title="Restore"
          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 hover:from-sky-600 to-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg dark:shadow-lg px-3 sm:px-2 py-1.5 sm:py-1 rounded-lg font-semibold text-white text-sm transition duration-200 cursor-pointer"
        >
          <MdRestore className="w-6 sm:w-4 h-6 sm:h-6" />
          <span className="hidden sm:inline">Restore</span>
        </button>

        <button
          onClick={handleDeleteFn}
          title="Delete Permanently"
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 hover:from-red-600 to-pink-500 hover:to-pink-600 shadow-md hover:shadow-lg dark:shadow-lg px-3 sm:px-2 py-1.5 sm:py-1 rounded-lg font-semibold text-white text-sm transition duration-200 cursor-pointer"
        >
          <MdDeleteForever className="w-6 sm:w-4 h-6 sm:h-6" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
}

export default TrashNotesCard;
