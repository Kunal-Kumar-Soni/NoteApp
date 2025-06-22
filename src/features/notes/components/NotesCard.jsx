import { useRef, useState } from "react";
import { MdPushPin } from "react-icons/md";

// Component to display individual note card with hold-to-open menu, view modal, and UI effects
function NotesCard({
  note,
  isMenuModalOpen,
  setIsMenuModalOpen,
  setIsViewModalOpen,
  setViewModalId,
  setMenuModalId,
}) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdTimer = useRef(null);
  const progressInterval = useRef(null);

  const { id, title, paragraph, date } = note;

  // Start long press interaction
  const startHold = () => {
    if (isMenuModalOpen) return;
    setHolding(true);
    setProgress(0);
    setMenuModalId(id);

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval.current);
          return 100;
        }
        return prev + 4;
      });
    }, 28);

    holdTimer.current = setTimeout(() => {
      setIsMenuModalOpen(true);
    }, 700);
  };

  // Clear long press interaction
  const clearHold = () => {
    clearTimeout(holdTimer.current);
    clearInterval(progressInterval.current);
    setHolding(false);
    setProgress(0);
  };

  // Handle note click to open view modal
  const handleClick = () => {
    setViewModalId(id);
    setIsViewModalOpen(true);
  };

  return (
    <div
      onClick={handleClick}
      onMouseDown={startHold}
      onMouseUp={clearHold}
      onMouseLeave={clearHold}
      onTouchStart={startHold}
      onTouchEnd={clearHold}
      onTouchCancel={clearHold}
      className={`relative overflow-hidden px-6 pt-4 pb-8 border rounded-2xl min-h-[165px] transition-all duration-300 ease-in-out cursor-pointer
        ${
          holding
            ? "scale-[1.03] border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.5)] dark:border-sky-500 dark:shadow-[0_0_25px_rgba(56,189,248,0.4)]"
            : "border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg"
        }
        bg-white dark:bg-slate-800 text-slate-800 dark:text-white select-none`}
    >
      {/* Background glow on hold */}
      {holding && (
        <span className="z-0 absolute inset-0 bg-sky-400/10 rounded-2xl animate-pulse pointer-events-none"></span>
      )}

      {/* Spinner animation */}
      {holding && (
        <div className="top-3 right-3 z-10 absolute border-2 border-sky-400 border-dashed rounded-full w-5.5 sm:w-6 h-5.5 sm:h-6 animate-spin"></div>
      )}

      {/* Progress bar on hold */}
      {holding && (
        <div
          className="bottom-0 left-0 z-10 absolute bg-sky-500 h-1 transition-all duration-50"
          style={{ width: `${progress}%` }}
        ></div>
      )}

      {/* Note creation date */}
      <p className="right-4 bottom-1 z-10 absolute text-slate-500 dark:text-slate-400 text-sm">
        {new Date(date).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>

      {/* Note title */}
      <h1 className="z-10 mb-2 font-semibold text-sky-600 dark:text-sky-400 text-xl line-clamp-1">
        {title.split(" ").length > 7
          ? title.split(" ").slice(0, 7).join(" ").toUpperCase()
          : title.toUpperCase()}
      </h1>

      {/* Note content preview */}
      <p className="z-10 relative text-base line-clamp-3 leading-relaxed">
        {paragraph.split(" ").length > 30
          ? paragraph.split(" ").slice(0, 30).join(" ")
          : paragraph}
      </p>

      {/* Pin icon for pinned notes */}
      {note.pinned && (
        <MdPushPin
          title="Pinned"
          className="top-3 right-3 absolute w-5.5 sm:w-6 h-5.5 sm:h-6 text-slate-500"
        />
      )}
    </div>
  );
}

export default NotesCard;
