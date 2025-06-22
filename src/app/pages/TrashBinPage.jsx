import { useState } from "react";

// Components for Trash bin functionality
import TrashViewModal from "../../features/trash/modals/TrashViewModal";
import TrashBinNav from "../../features/trash/components/TrashBinNav";
import TrashBinList from "../../features/trash/components/TrashBinList";
import TrashDeleteModal from "../../features/trash/modals/TrashDeleteModal";
import TrashDeleteAllModal from "../../features/trash/modals/TrashDeleteAllModal";
import { ToastContainer } from "react-toastify";

function TrashBinPage() {
  // Modal state for viewing a trashed note
  const [isTrashViewModalOpen, setIsTrashViewModalOpen] = useState(false);
  const [trashViewModalId, setTrashViewModalId] = useState(null);

  // Modal state for deleting a single trashed note
  const [isTrashDeleteModalOpen, setIsTrashDeleteModalOpen] = useState(false);
  const [trashDeleteModalId, setTrashDeleteModalId] = useState(null);

  // Modal state for deleting all trashed notes
  const [isTrashDeleteAllModalOpen, setIsTrashDeleteAllModalOpen] =
    useState(false);

  return (
    <div className="dark:bg-slate-900 h-screen overflow-y-auto">
      {/* Top navigation bar */}
      <TrashBinNav
        setIsTrashDeleteAllModalOpen={setIsTrashDeleteAllModalOpen}
      />

      {/* List of trashed notes */}
      <TrashBinList
        setIsTrashViewModalOpen={setIsTrashViewModalOpen}
        setTrashViewModalId={setTrashViewModalId}
        setIsTrashDeleteModalOpen={setIsTrashDeleteModalOpen}
        setTrashDeleteModalId={setTrashDeleteModalId}
      />

      {/* Modal to view note details */}
      <TrashViewModal
        isTrashViewModalOpen={isTrashViewModalOpen}
        setIsTrashViewModalOpen={setIsTrashViewModalOpen}
        trashViewModalId={trashViewModalId}
      />

      {/* Modal to confirm delete of a single trashed note */}
      <TrashDeleteModal
        isTrashDeleteModalOpen={isTrashDeleteModalOpen}
        setIsTrashDeleteModalOpen={setIsTrashDeleteModalOpen}
        trashDeleteModalId={trashDeleteModalId}
      />

      {/* Modal to confirm delete of all trashed notes */}
      <TrashDeleteAllModal
        isTrashDeleteAllModalOpen={isTrashDeleteAllModalOpen}
        setIsTrashDeleteAllModalOpen={setIsTrashDeleteAllModalOpen}
      />

      {/* Toast notifications for feedback */}
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

export default TrashBinPage;
