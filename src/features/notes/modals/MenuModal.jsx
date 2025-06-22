import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Pin, PinOff, Trash } from "lucide-react";

function MenuModal({
  isMenuModalOpen,
  setIsMenuModalOpen,
  notes,
  setNotes,
  menuModalId,
  setIsDeleteModalOpen,
  setIsEditModalOpen,
}) {
  const modalRef = useRef(null);

  // Close modal if user clicks outside of it
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsMenuModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    document.addEventListener("touchstart", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
      document.removeEventListener("touchstart", handleClickOutSide);
    };
  }, []);

  // Open Edit modal and close current menu modal
  const handleEdit = () => {
    setIsEditModalOpen(true);
    setIsMenuModalOpen(false);
  };

  // Toggle pin/unpin for the selected note
  const handlePin = () => {
    setIsMenuModalOpen(false);
    const updatedNotes = notes.map((note) =>
      note.id === menuModalId ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updatedNotes);
  };

  // Open Delete confirmation modal
  const handleDelete = () => {
    setIsMenuModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  // Get the selected note for showing current pin state
  const selectedNoteForPin = notes.find((note) => note.id === menuModalId);

  return (
    <AnimatePresence>
      {isMenuModalOpen && (
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
            className="relative bg-white dark:bg-slate-800 shadow-2xl p-6 border border-slate-200 dark:border-slate-700 rounded-2xl w-[90%] max-w-sm text-slate-800 dark:text-white transition-all"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuModalOpen(false)}
              className="top-4 right-4 absolute text-slate-400 hover:text-slate-600 dark:hover:text-white dark:text-slate-300 text-2xl active:scale-95 transition cursor-pointer"
            >
              <MdClose size={22} />
            </button>

            {/* Header */}
            <div className="mb-6 text-center">
              <h2 className="font-semibold text-xl tracking-wide">
                Quick Actions
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Manage your note
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleEdit}
                className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 px-4 py-2 rounded-xl text-slate-800 dark:text-white transition cursor-pointer"
              >
                <Pencil size={20} /> Edit
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 px-4 py-2 rounded-xl text-slate-800 dark:text-white transition cursor-pointer"
              >
                <Trash size={20} /> Delete
              </button>

              <button
                onClick={handlePin}
                className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 px-4 py-2 rounded-xl text-slate-800 dark:text-white transition cursor-pointer"
              >
                {selectedNoteForPin?.pinned ? (
                  <PinOff size={20} />
                ) : (
                  <Pin size={20} />
                )}
                {selectedNoteForPin?.pinned ? "Unpin" : "Pin"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MenuModal;
