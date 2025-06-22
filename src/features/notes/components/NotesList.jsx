// Component for displaying the list of notes with animations, empty states, and Delete All functionality

import { BookHeart, StickyNote, Trash2 } from "lucide-react";
import NotesCard from "./NotesCard";
import { motion } from "framer-motion";

function NotesList({
  notes,
  search,
  isMenuModalOpen,
  setIsMenuModalOpen,
  setIsViewModalOpen,
  setViewModalId,
  setMenuModalId,
  setIsDeleteAllModalOpen,
}) {
  // Filter notes based on the search input
  const filteredVal = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sort notes so that pinned notes appear first
  const sortedNotes = [...filteredVal].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  // Empty state check
  const noNotes = notes.length === 0;
  const noSearchResults = search && sortedNotes.length === 0;

  return (
    <section className="mx-auto px-4 py-3 rounded-xl max-w-[1200px]">
      {/* Header with title and Delete All button */}
      <motion.div
        initial={{ opacity: 0, x: -100, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.33, 1, 0.68, 1],
        }}
        className="flex justify-between items-center bg-white/70 dark:bg-white/5 shadow-sm dark:shadow-md backdrop-blur-md mb-6 p-4 border border-slate-200 dark:border-slate-700 rounded-xl"
      >
        <h2 className="flex items-center gap-1.5 font-serif font-semibold text-md text-sky-500 dark:text-white sm:text-xl tracking-normal sm:tracking-wide">
          <span className="inline-flex justify-center items-center bg-white dark:bg-slate-800 shadow-[0_0_4px_rgba(0,0,0,0.5)] dark:shadow-[0_0_4px_rgba(255,255,255,0.4)] p-2 rounded-full">
            <BookHeart className="drop-shadow-md w-6 sm:w-9 h-6 sm:h-9 text-sky-500" />
          </span>
          YOUR NOTES{" "}
        </h2>
        {notes.length > 1 && (
          <button
            onClick={() => setIsDeleteAllModalOpen(true)}
            title="Delete All"
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 shadow-md dark:shadow-lg hover:brightness-110 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-white text-sm transition-all duration-300 cursor-pointer"
          >
            <Trash2 className="hidden sm:block w-3 sm:w-4 h-3 sm:h-4" />
            Delete All
          </button>
        )}
      </motion.div>

      {/* Notes Grid */}
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-4 w-full">
        {sortedNotes.length > 0 ? (
          // Render each note with animation
          sortedNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -100, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                delay: index * 0.05,
              }}
            >
              <NotesCard
                note={note}
                isMenuModalOpen={isMenuModalOpen}
                setIsMenuModalOpen={setIsMenuModalOpen}
                setIsViewModalOpen={setIsViewModalOpen}
                setViewModalId={setViewModalId}
                setMenuModalId={setMenuModalId}
              />
            </motion.div>
          ))
        ) : noSearchResults ? (
          // If search returns no match
          <p className="col-span-full font-medium text-sky-700 dark:text-sky-300 text-lg text-center">
            No matching notes found.
          </p>
        ) : noNotes ? (
          // If there are no notes at all
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="col-span-full mt-24 text-slate-500 dark:text-slate-400 text-center"
          >
            <StickyNote className="mx-auto mb-4 w-10 h-10 text-slate-400 dark:text-slate-500" />
            <h2 className="font-semibold text-2xl tracking-tight">
              It’s quiet here...
            </h2>
            <p className="mt-2 text-base">
              Start capturing your thoughts and moments ✨
            </p>
            <p className="mt-2 text-base">
              Long press anywhere on a note to see more options.
            </p>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

export default NotesList;
