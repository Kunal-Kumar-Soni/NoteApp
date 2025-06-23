import { MdClose } from "react-icons/md";
import useTrashNotes from "../hooks/useTrashNotes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

function TrashViewModal({
  isTrashViewModalOpen,
  setIsTrashViewModalOpen,
  trashViewModalId,
}) {
  const modalRef = useRef(null);
  const { trashNotes } = useTrashNotes();

  // Find the selected note to display in modal
  const selectedNote = trashNotes.find(
    (trashNote) => trashNote.id === trashViewModalId
  );

  // Close modal when clicked outside
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsTrashViewModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    document.addEventListener("touchstart", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
      document.removeEventListener("touchstart", handleClickOutSide);
    };
  }, []);

  return (
    <AnimatePresence>
      {isTrashViewModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm"
        >
          <div
            ref={modalRef}
            className="relative bg-white dark:bg-slate-800 shadow-2xl border border-slate-300 dark:border-slate-700 rounded-2xl w-[100%] sm:w-auto sm:min-w-[30%] max-w-[80%] max-h-[80vh] overflow-y-auto text-slate-800 dark:text-white transition-all custom-scroll"
          >
            {/* Close button (top-right corner) */}
            <button
              onClick={() => setIsTrashViewModalOpen(false)}
              className="top-4 float-right right-2 z-10 sticky bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-white dark:text-slate-300 text-xl sm:text-2xl active:scale-95 transition cursor-pointer"
            >
              <MdClose size={22} />
            </button>

            <div className="p-6">
              {/* Note title */}
              <h2 className="mb-4 font-bold text-sky-600 dark:text-sky-400 text-2xl break-words line-clamp-1">
                {selectedNote?.title.toUpperCase() || "Untitled Note"}
              </h2>

              {/* Note date */}
              <p className="mb-4 text-sky-700 dark:text-sky-300 text-xs italic">
                {new Date(selectedNote.date).toLocaleString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {/* Note content */}
              <p className="text-base leading-relaxed tracking-wide whitespace-pre-line">
                {selectedNote?.paragraph || "No content available."}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TrashViewModal;
