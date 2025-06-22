import { motion } from "framer-motion";
import useTrashNotes from "../hooks/useTrashNotes";
import TrashNotesCard from "./TrashNotesCard";

function TrashBinList({
  setIsTrashViewModalOpen,
  setTrashViewModalId,
  setIsTrashDeleteModalOpen,
  setTrashDeleteModalId,
}) {
  // Get trashed notes from context
  const { trashNotes } = useTrashNotes();

  return (
    <div className="mx-auto mt-6 px-4 max-w-[1200px]">
      {/* If there are trashed notes, display them */}
      {trashNotes.length > 0 ? (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-4 w-full">
          {trashNotes.map((trashNote, index) => (
            <motion.div
              key={trashNote.id}
              initial={{ opacity: 0, x: -100, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.98 }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                delay: index * 0.05, // stagger animation
              }}
            >
              {/* TrashNote card component */}
              <TrashNotesCard
                trashNote={trashNote}
                setIsTrashViewModalOpen={setIsTrashViewModalOpen}
                setTrashViewModalId={setTrashViewModalId}
                setIsTrashDeleteModalOpen={setIsTrashDeleteModalOpen}
                setTrashDeleteModalId={setTrashDeleteModalId}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        // Empty trash message
        <div className="bg-white dark:bg-sky-950 shadow-inner p-10 border-2 border-sky-200 dark:border-sky-700 border-dashed rounded-2xl text-center">
          <h2 className="font-semibold text-sky-700 dark:text-sky-200 text-lg">
            No deleted notes yet.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sky-500 dark:text-sky-400 text-sm">
            When you delete a note, it will appear here. You can choose to
            restore or permanently delete it later.
          </p>
        </div>
      )}
    </div>
  );
}

export default TrashBinList;
