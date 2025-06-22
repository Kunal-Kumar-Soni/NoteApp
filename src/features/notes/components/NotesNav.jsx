import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdDarkMode, MdLightMode, MdSearch } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

// Top navigation bar for Notes page (logo, search, dark mode toggle, trash button)
function NotesNav({ handleDarkMode, modes, search, setSearch }) {
  const [visibleSearch, setVisibleSearch] = useState(false); // mobile search toggle

  return (
    <section className="border-slate-300 dark:border-slate-600 border-b">
      <div className="flex justify-between items-center mx-auto px-4 py-3 rounded-xl max-w-[1200px] duration-300">
        {/* Logo */}
        <div className="flex items-center">
          <img
            className="mr-1 md:mr-2 h-9 sm:h-10 object-contain"
            src="images/note-logo.png"
            alt="logo"
          />
          <h1 className="font-serif font-semibold text-sky-500 dark:text-white text-xl md:text-2xl tracking-wide">
            Notes
          </h1>
        </div>

        {/* Search input (desktop only) */}
        <div className="hidden md:block relative mx-auto w-[60%]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white dark:bg-slate-800 px-9 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 w-full text-slate-800 dark:text-white transition-all duration-200 placeholder-slate-500 dark:placeholder-slate-400"
            type="text"
            placeholder="Search your notes..."
          />
          <MdSearch className="top-2.5 left-2 absolute text-slate-500 dark:text-slate-500 text-2xl" />
        </div>

        {/* Action buttons (search toggle, theme toggle, trash) */}
        <div className="flex items-center gap-3">
          {/* Mobile: Toggle search input */}
          <button
            onClick={() => setVisibleSearch(!visibleSearch)}
            className="md:hidden bg-sky-500 hover:bg-sky-600 shadow-md p-3 rounded-full text-white text-2xl active:scale-95 transition-transform cursor-pointer"
          >
            <MdSearch />
          </button>

          {/* Toggle dark/light mode */}
          <button
            onClick={handleDarkMode}
            className="bg-sky-500 hover:bg-sky-600 shadow-md p-3 rounded-full text-white text-2xl active:scale-95 transition-transform cursor-pointer"
          >
            {modes === "light" ? <MdDarkMode /> : <MdLightMode />}
          </button>

          {/* Go to Trash Bin page */}
          <NavLink
            to="/trashbin"
            className="bg-sky-500 hover:bg-sky-600 shadow-md p-3 rounded-full text-white text-2xl active:scale-95 transition-transform cursor-pointer"
          >
            <IoMdTrash />
          </NavLink>
        </div>
      </div>

      {/* Mobile: search input visible on toggle */}
      <AnimatePresence>
        {visibleSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden relative mx-auto px-4 py-3 w-full"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-slate-800 px-9 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 w-full text-slate-800 dark:text-white transition-all duration-200 placeholder-slate-500 dark:placeholder-slate-400"
              type="text"
              placeholder="Search your notes..."
            />
            <MdSearch className="top-5.5 left-5 absolute text-slate-500 dark:text-slate-500 text-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default NotesNav;
