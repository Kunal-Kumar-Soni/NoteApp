import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

function ViewModal({
  isViewModalOpen,
  setIsViewModalOpen,
  notes,
  viewModalId,
}) {
  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsViewModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    document.addEventListener("touchstart", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
      document.removeEventListener("touchstart", handleClickOutSide);
    };
  }, []);

  // Find the selected note by its ID
  const selectedNote = notes.find((note) => note.id === viewModalId);

  return (
    <AnimatePresence>
      {isViewModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-colors"
        >
          <div
            ref={modalRef}
            className="relative bg-white dark:bg-slate-800 shadow-2xl border border-slate-300 dark:border-slate-700 rounded-2xl w-[100%] sm:min-w-[30%] max-w-[80%] max-h-[80vh] overflow-y-auto text-slate-800 dark:text-white transition-all custom-scroll"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="top-4 float-right right-2 z-10 sticky bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-white dark:text-slate-300 text-xl sm:text-2xl active:scale-95 transition cursor-pointer"
            >
              <MdClose />
            </button>

            <div className="p-6">
              {/* Note Title */}
              <h2 className="mb-4 font-bold text-sky-600 dark:text-sky-400 text-2xl break-words line-clamp-1">
                {selectedNote?.title.toUpperCase() || "Untitled Note"}
              </h2>

              {/* Note Date */}
              {selectedNote?.date && (
                <p className="mb-4 text-sky-700 dark:text-sky-300 text-xs italic">
                  {new Date(selectedNote.date).toLocaleString(undefined, {
                    weekday: "long", // e.g., "Saturday"
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}

              {/* Note Paragraph Content */}
              <div className="text-base leading-relaxed tracking-wide whitespace-pre-line">
                {selectedNote?.paragraph || "No content available."}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ViewModal;
