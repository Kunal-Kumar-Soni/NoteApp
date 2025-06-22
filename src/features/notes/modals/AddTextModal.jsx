import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

function AddTextModal({
  isAddTextModalOpen,
  setIsAddTextModalOpen,
  notes,
  setNotes,
}) {
  const [headingInput, setHeadingInput] = useState("");
  const [paragraphInput, setParagraphInput] = useState("");
  const modalRef = useRef(null);

  // Save note to state
  const handleSaveNotes = () => {
    let trimHeading = headingInput.trim();
    let trimParagraph = paragraphInput.trim();

    if (trimHeading === "" || trimParagraph === "") return;

    let data = {
      id: Date.now(),
      title: trimHeading,
      paragraph: trimParagraph,
      date: new Date().toISOString(),
      pinned: false,
    };
    setNotes((prev) => [...prev, data]);
    setHeadingInput("");
    setParagraphInput("");
    setIsAddTextModalOpen(false);
  };

  // Sync notes to localStorage
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  // Close modal when clicked outside
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsAddTextModalOpen(false);
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
      {isAddTextModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-colors"
        >
          <div
            ref={modalRef}
            className="relative space-y-4 bg-white dark:bg-slate-800 shadow-2xl mx-5 sm:mx-0 p-6 rounded-xl w-full max-w-xl"
          >
            {/* Close button */}
            <button
              onClick={() => setIsAddTextModalOpen(false)}
              className="top-4 right-4 absolute text-slate-400 hover:text-slate-600 dark:hover:text-white dark:text-slate-300 text-2xl active:scale-95 transition cursor-pointer"
            >
              <MdClose />
            </button>

            <h2 className="font-semibold text-slate-800 dark:text-white text-xl">
              Create Note
            </h2>

            {/* Heading Input */}
            <input
              value={headingInput}
              onChange={(e) => setHeadingInput(e.target.value)}
              type="text"
              placeholder="Enter heading..."
              className="bg-white dark:bg-slate-700 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 w-full text-slate-800 dark:text-white transition-all"
            />

            {/* Paragraph Input */}
            <textarea
              value={paragraphInput}
              onChange={(e) => setParagraphInput(e.target.value)}
              rows="6"
              placeholder="Write your note here..."
              className="bg-white dark:bg-slate-700 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 w-full text-slate-800 dark:text-white transition-all resize-none"
            ></textarea>

            {/* Save Button */}
            <button
              onClick={handleSaveNotes}
              className="bg-sky-600 hover:bg-sky-700 px-6 py-2 rounded-lg text-white transition-all cursor-pointer"
            >
              Save Note
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddTextModal;
