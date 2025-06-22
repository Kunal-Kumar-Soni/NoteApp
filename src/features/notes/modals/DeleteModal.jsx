import { MdClose, MdDeleteForever, MdOutlineDelete } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import useTrashNotes from "../../trash/hooks/useTrashNotes";
import { toast } from "react-toastify";

function DeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  notes,
  setNotes,
  menuModalId,
}) {
  const { trashNotes, setTrashNotes } = useTrashNotes();
  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsDeleteModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    document.addEventListener("touchstart", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
      document.removeEventListener("touchstart", handleClickOutSide);
    };
  }, []);

  // Move note to trash
  const handleTrashFn = () => {
    const filterNotes = notes.filter((note) => note.id !== menuModalId);
    setNotes(filterNotes);
    setIsDeleteModalOpen(false);

    const singleData = notes.find((note) => note.id === menuModalId);
    setTrashNotes((prev) => [...prev, singleData]);

    toast.warn("Note moved to trash");
  };

  // Update trashNotes in localStorage
  useEffect(() => {
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
  }, [trashNotes]);

  // Permanently delete the note
  const handleDeleteFn = () => {
    const filterNotes = notes.filter((note) => note.id !== menuModalId);
    setNotes(filterNotes);
    setIsDeleteModalOpen(false);

    toast.error("Note has been deleted");
  };

  return (
    <AnimatePresence>
      {isDeleteModalOpen && (
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
            {/* Close Button */}
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="top-4 right-4 absolute text-slate-400 hover:text-slate-600 dark:hover:text-white dark:text-slate-300 text-2xl active:scale-95 transition cursor-pointer"
            >
              <MdClose />
            </button>

            {/* Title */}
            <h2 className="mb-2 font-semibold text-sky-600 dark:text-sky-400 text-xl">
              Delete Note?
            </h2>

            {/* Description */}
            <p className="mb-6 text-slate-600 dark:text-slate-300 text-sm">
              Are you sure you want to delete this note? Move it to Trash or
              delete it permanently.
            </p>

            {/* Action Buttons */}
            <div className="flex sm:flex-row flex-col gap-3">
              <button
                onClick={handleTrashFn}
                className="flex justify-center items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md w-full sm:w-1/2 font-medium text-white sm:text-md text-sm transition cursor-pointer"
              >
                <MdOutlineDelete className="w-5 h-5" />
                Move to Trash
              </button>

              <button
                onClick={handleDeleteFn}
                className="flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md w-full sm:w-1/2 font-medium text-white sm:text-md text-sm transition cursor-pointer"
              >
                <MdDeleteForever className="w-5 h-5" />
                Delete Permanently
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteModal;
