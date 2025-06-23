import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useNotes from "../../notes/hooks/useNotes";
import useTrashNotes from "../hooks/useTrashNotes";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { BsTrash3 } from "react-icons/bs";

function TrashBinNav({ setIsTrashDeleteAllModalOpen }) {
  // Access notes and trashNotes from context
  const { notes, setNotes } = useNotes();
  const { trashNotes, setTrashNotes } = useTrashNotes();
  const navigate = useNavigate();

  // Restore all notes from trash to active notes
  const handleRestoreAll = () => {
    const updatedNotes = [...notes, ...trashNotes];
    setNotes(updatedNotes);
    setTrashNotes([]);

    localStorage.setItem("Notes", JSON.stringify(updatedNotes));
    localStorage.setItem("trashNotes", JSON.stringify([]));

    toast.info("All notes restored");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      <div className="bg-white/60 dark:bg-[#0f172a]/60 shadow-sm dark:shadow-md backdrop-blur-sm border-slate-300 dark:border-slate-600 border-b transition">
        <div className="flex flex-col gap-5 mx-auto px-4 pt-6 pb-4 max-w-[1200px]">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // Navigate back to the Notes page
            className="flex items-center gap-2 w-fit font-medium text-sky-700 hover:text-sky-900 dark:hover:text-white dark:text-sky-300 text-sm hover:underline underline-offset-2 transition duration-200 cursor-pointer"
          >
            <IoMdArrowBack className="w-5 h-5" />
            <span>Back to Notes</span>
          </button>

          {/* Title and Action Buttons */}
          <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-3 sm:gap-5">
            {/* Trash Bin Title */}
            <div className="flex items-center gap-3">
              <BsTrash3 className="drop-shadow-sm text-[30px] text-sky-500 dark:text-sky-300" />
              <h1 className="font-bold text-sky-500 dark:text-white text-2xl sm:text-3xl leading-tight tracking-tight">
                Trash Bin
              </h1>
            </div>

            {/* Restore All & Delete All Buttons */}
            {trashNotes.length > 1 && (
              <div className="flex items-center gap-3">
                {/* Restore All Button */}
                <button
                  onClick={handleRestoreAll}
                  className="bg-gradient-to-r from-sky-500 hover:from-sky-600 to-blue-600 hover:to-blue-700 shadow-md dark:shadow-lg px-5 py-2 rounded-lg font-semibold text-white text-sm transition duration-200 cursor-pointer"
                >
                  Restore All
                </button>

                {/* Delete All Button (opens confirmation modal) */}
                <button
                  onClick={() => {
                    setIsTrashDeleteAllModalOpen(true);
                  }}
                  className="bg-gradient-to-r from-red-500 hover:from-red-600 to-pink-500 hover:to-pink-600 shadow-md dark:shadow-lg px-5 py-2 rounded-lg font-semibold text-white text-sm transition duration-200 cursor-pointer"
                >
                  Delete All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TrashBinNav;
