import { MdClose } from "react-icons/md";
import useTrashNotes from "../hooks/useTrashNotes";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

// Modal for confirming "Delete All" action in Trash Bin
const TrashDeleteAllModal = ({
  isTrashDeleteAllModalOpen,
  setIsTrashDeleteAllModalOpen,
}) => {
  const { trashNotes, setTrashNotes } = useTrashNotes();
  const modalRef = useRef(null);

  // Close modal when user clicks outside the modal content
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsTrashDeleteAllModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    document.addEventListener("touchstart", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
      document.removeEventListener("touchstart", handleClickOutSide);
    };
  }, []);

  // Permanently delete all trash notes
  const handleDeleteAll = () => {
    if (trashNotes.length === 0) return;

    setTrashNotes([]);
    localStorage.setItem("trashNotes", JSON.stringify([]));
    setIsTrashDeleteAllModalOpen(false);

    toast.error("Deleted all notes from Trash");
  };

  return (
    <AnimatePresence>
      {isTrashDeleteAllModalOpen && trashNotes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm"
        >
          <div
            ref={modalRef}
            className="relative bg-white dark:bg-slate-800 shadow-xl p-6 rounded-xl w-[90%] max-w-md text-slate-800 dark:text-white"
          >
            {/* Close icon (top right) */}
            <button
              onClick={() => setIsTrashDeleteAllModalOpen(false)}
              className="top-4 right-4 absolute text-slate-400 hover:text-slate-600 dark:hover:text-white dark:text-slate-300 text-2xl active:scale-95 transition cursor-pointer"
            >
              <MdClose />
            </button>

            {/* Modal Heading */}
            <h2 className="mb-2 font-semibold text-sky-600 dark:text-sky-400 text-xl">
              Confirm Delete All
            </h2>

            {/* Confirmation Message */}
            <p className="mb-6 text-slate-600 dark:text-slate-300 text-sm">
              Are you sure you want to delete all notes permanently?
            </p>

            {/* Cancel and Confirm Buttons */}
            <div
              onClick={() => setIsTrashDeleteAllModalOpen(false)}
              className="flex justify-end gap-3"
            >
              <button className="hover:bg-slate-100 dark:hover:bg-slate-700 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md sm:text-md text-sm transition cursor-pointer">
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-medium text-white sm:text-md text-sm transition cursor-pointer"
              >
                Delete All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrashDeleteAllModal;
