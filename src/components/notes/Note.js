import parse from "html-react-parser";
import { useState } from "react";
import ReadNote from "../modals/ReadNote";

export default function Note({
  docId,
  noteTitle,
  note,
  setDeleteNote,
  setEditNote,
  setSelectNoteId,
  setNoteTitle,
  setNote,
}) {
  const [readNote, setReadNote] = useState(false);

  return (
    <>
      <div
        onClick={() => setReadNote(true)}
        className="relative cursor-pointer w-full h-60 rounded-md mb-6 border border-gray-base text-black col-span-3 lg:col-span-1"
      >
        <h2 className="p-4 bg-primary text-white text-lg rounded-t-md font-semibold">
          {noteTitle}
        </h2>

        <div className="p-4 py-5 line-clamp-3">{parse(note)}</div>

        <span className="flex space-x-1 absolute bottom-2 px-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditNote(true);
              setSelectNoteId(docId);
              setNoteTitle(noteTitle);
              setNote(note);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteNote(true);
              setSelectNoteId(docId);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="red"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </span>
        <ReadNote
          readNote={readNote}
          setReadNote={setReadNote}
          noteTitle={noteTitle}
          note={note}
        />
      </div>
    </>
  );
}
