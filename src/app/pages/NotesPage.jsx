import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { ToastContainer } from "react-toastify";

// Components for Notes functionality
import NotesNav from "../../features/notes/components/NotesNav";
import NotesList from "../../features/notes/components/NotesList";
import AddTextModal from "../../features/notes/modals/AddTextModal";
import MenuModal from "../../features/notes/modals/MenuModal";
import ViewModal from "../../features/notes/modals/ViewModal";
import EditModal from "../../features/notes/modals/EditModal";
import DeleteModal from "../../features/notes/modals/DeleteModal";
import DeleteAllModal from "../../features/notes/modals/DeleteAllModal";

// Custom hook for accessing and updating notes
import useNotes from "../../features/notes/hooks/useNotes";

function NotesPage({ modes, setModes }) {
  // Modal visibility states
  const [isAddTextModalOpen, setIsAddTextModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);

  // Modal identifiers
  const [menuModalId, setMenuModalId] = useState(null);
  const [viewModalId, setViewModalId] = useState(null);

  // Notes data from context
  const { notes, setNotes } = useNotes();

  // Search state
  const [search, setSearch] = useState("");

  return (
    <div className="dark:bg-slate-900 h-screen overflow-y-auto">
      {/* Floating Add Note Button */}
      <button
        onClick={() => setIsAddTextModalOpen(true)}
        className="right-6 bottom-6 z-40 fixed bg-sky-500 hover:bg-sky-600 p-4 rounded-full text-white text-3xl active:scale-95 transition cursor-pointer"
      >
        <FiPlus />
      </button>

      {/* Navbar with search and theme toggle */}
      <NotesNav
        search={search}
        setSearch={setSearch}
        modes={modes}
        setModes={setModes}
      />

      {/* Modals and Components */}
      <AddTextModal
        isAddTextModalOpen={isAddTextModalOpen}
        setIsAddTextModalOpen={setIsAddTextModalOpen}
        notes={notes}
        setNotes={setNotes}
      />

      <NotesList
        search={search}
        notes={notes}
        isMenuModalOpen={isMenuModalOpen}
        setIsMenuModalOpen={setIsMenuModalOpen}
        setIsViewModalOpen={setIsViewModalOpen}
        setViewModalId={setViewModalId}
        setMenuModalId={setMenuModalId}
        setIsDeleteAllModalOpen={setIsDeleteAllModalOpen}
      />

      <MenuModal
        isMenuModalOpen={isMenuModalOpen}
        setIsMenuModalOpen={setIsMenuModalOpen}
        notes={notes}
        setNotes={setNotes}
        menuModalId={menuModalId}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />

      <ViewModal
        isViewModalOpen={isViewModalOpen}
        setIsViewModalOpen={setIsViewModalOpen}
        notes={notes}
        viewModalId={viewModalId}
      />

      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        notes={notes}
        setNotes={setNotes}
        menuModalId={menuModalId}
      />

      <DeleteAllModal
        isDeleteAllModalOpen={isDeleteAllModalOpen}
        setIsDeleteAllModalOpen={setIsDeleteAllModalOpen}
      />

      <EditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        menuModalId={menuModalId}
      />

      {/* Toast notifications */}
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        closeButton={false}
        toastClassName={() =>
          "relative min-h-[38px] h-auto mb-4 px-3 py-2 flex items-center rounded-md text-sm font-medium shadow-lg bg-white text-black border border-slate-200 dark:bg-[#1e293b] dark:text-sky-100 dark:border-slate-700 overflow-hidden"
        }
        progressClassName="bg-sky-500 dark:bg-sky-400 h-1 rounded-full absolute bottom-0 left-2 right-2"
      />
    </div>
  );
}

export default NotesPage;
