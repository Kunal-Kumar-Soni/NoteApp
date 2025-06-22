import React, { useRef, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import useNotes from "../hooks/useNotes";
import { toast } from "react-toastify";

function EditModal({ isEditModalOpen, setIsEditModalOpen, menuModalId }) {
  const { notes, setNotes } = useNotes();

  const [titleInput, setTitleInput] = useState("");
  const [paragraphInput, setParagraphInput] = useState("");
  const modalRef = useRef(null);

  // Get selected note for editing
  const selectedNote = notes.find((note) => note.id === menuModalId);

  // Populate input fields with selected note data
  useEffect(() => {
    if (selectedNote) {
      setTitleInput(selectedNote.title);
      setParagraphInput(selectedNote.paragraph);
    }
  }, [selectedNote]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsEditModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Save edited note
  const handleSave = () => {
    const editedNote = notes.map((note) =>
      note.id === menuModalId
        ? { ...note, title: titleInput, paragraph: paragraphInput }
        : note
    );

    setNotes(editedNote);
    localStorage.setItem("Notes", JSON.stringify(editedNote));
    setIsEditModalOpen(false);
    toast.success("Note updated successfully");
  };

  return (
    <AnimatePresence>
      {isEditModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/40 dark:bg-black/60 backdrop-blur-sm px-4"
        >
          <div
            ref={modalRef}
            className="relative space-y-4 bg-white dark:bg-slate-800 shadow-xl p-6 rounded-xl w-full max-w-md text-slate-900 dark:text-white"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="top-3 right-3 absolute text-slate-500 hover:text-slate-700 dark:hover:text-white dark:text-slate-300 transition cursor-pointer"
            >
              <MdClose className="w-5 h-5" />
            </button>

            {/* Heading */}
            <h2 className="font-semibold text-slate-800 dark:text-white text-xl">
              Edit Note
            </h2>

            {/* Title Input */}
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Edit heading..."
              className="bg-white dark:bg-slate-700 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 w-full text-slate-800 dark:text-white transition-all"
            />

            {/* Paragraph Input */}
            <textarea
              rows="6"
              placeholder="Edit your note here..."
              value={paragraphInput}
              onChange={(e) => setParagraphInput(e.target.value)}
              className="bg-white dark:bg-slate-700 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 w-full text-slate-800 dark:text-white transition-all resize-none"
            ></textarea>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="bg-sky-600 hover:bg-sky-700 px-6 py-2 rounded-lg text-white transition-all cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EditModal;
