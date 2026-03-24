# 📝 Notes App

A beautifully designed, fully responsive Notes App built with React, Tailwind CSS, and Framer Motion. This app allows users to create, manage, and delete notes with smooth UI animations, and dark mode compatibility.

---

## 🚀 Features

### ✅ Create & Save Notes

- Add a title and content.
- Notes are stored in `localStorage` so they persist after refresh.

### 💂 View All Notes

- Notes are displayed as cards with title, preview, and date.
- Responsive layout with clean styling.

### 📌 Pin Notes

- Pin important notes to keep them at the top.

### 👆 Long Press for More Options

- Press and hold on any note to reveal more actions.

### 👁 View Note in Modal

- Click to open a full-screen scrollable modal to read the full note.

### ✏️ Edit Notes

- Edit any note using a modal.
- Changes are auto-saved to localStorage.

### 🗑 Move to Trash (Soft Delete)

- Notes aren’t deleted immediately.
- Can be restored later from the Trash.

### 🗃 Trash Bin View

- See all trashed notes.
- Restore or permanently delete them.

### ♻️ Restore Notes

- Bring back any note from the Trash.

### 🔥 Delete All (Permanent Delete)

- Confirmation modal before deleting all notes.

### 🌑 Dark Mode Support

- Smooth color transitions.

### 🪤 Framer Motion Animations

- All modals and buttons have entry/exit animations.

### 🔔 Toast Notifications

- Real-time feedback using `react-toastify`.

### 🔐 LocalStorage Based

- Fully functional without any backend.
- Fast, secure, and offline-ready.

---

## 📂 Folder Structure (Simplified)

```
/src
  ├── app
  │   ├── pages              # NotesPage.jsx, TrashBinPage.jsx
  │   ├── App.jsx
  │   └── App.css
  ├── features
  │   ├── notes
  │   │   ├── components     # Note-related UI components
  │   │   ├── context        # Note context providers
  │   │   ├── hooks          # Note-specific custom hooks
  │   │   └── modals         # Note view/edit modals
  │   └── trash
  │       ├── components     # Trash-related UI components
  │       ├── context        # Trash context providers
  │       ├── hooks          # Trash-specific custom hooks
  │       └── modals         # Trash view/delete modals
  ├── index.css
  └── main.jsx
```

---

## 🧑‍💻 Tech Stack

- React
- Tailwind CSS
- Framer Motion
- React Icons
- React Toastify
- localStorage

---

## 📦 Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/Kunal-Kumar-Soni/NoteApp.git

# 2. Navigate to the project directory
cd NoteApp

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

---

## 🤝 Acknowledgements

- Inspired by real-world note-taking apps like Google Keep and Notion.

---

> Designed & developed with ❤️ by Kunal Kumar Soni
