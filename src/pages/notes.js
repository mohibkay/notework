import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CreateNote from "../components/modals/CreateNote";
import DeleteNote from "../components/modals/DeleteNote";
import DeleteNotebook from "../components/modals/DeleteNotebook";
import EditNote from "../components/modals/EditNote";
import EditNotebook from "../components/modals/EditNotebook";
import AddNote from "../components/notes/AddNote";
import Note from "../components/notes/Note";
import { firebase } from "../lib/firebase";

export default function Notes() {
  const [notebook, setNotebook] = useState("");
  const [deleteNotebookModal, setDeleteNotebookModal] = useState(false);
  const [editNotebook, setEditNotebook] = useState(false);
  const { notebookId, notebookName } = useParams();

  const [notes, setNotes] = useState(null);
  const [createNote, setCreateNote] = useState(false);
  const [deleteNote, setDeleteNote] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [note, setNote] = useState("");
  const [selectNoteId, setSelectNoteId] = useState("");

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("notebooks")
      .doc(notebookId)
      .onSnapshot((doc) => setNotebook({ ...doc.data(), docId: doc.id }));

    return () => unsubscribe();
  }, [notebookId]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("notes")
      .where("notebookId", "==", notebookId)
      .onSnapshot((snapshot) =>
        setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id })))
      );
    return () => unsubscribe();
  }, [notebookId]);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto mt-8 px-3 mb-2">
        <span className="flex items-center space-x-3">
          <h2 className="font-bold text-3xl">{notebook?.notebookName}</h2>

          {notebook && (
            <>
              <svg
                onClick={() => setEditNotebook(true)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <svg
                onClick={() => setDeleteNotebookModal(true)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </>
          )}
        </span>

        <EditNotebook
          docId={notebook.docId}
          editNotebook={editNotebook}
          setEditNotebook={setEditNotebook}
          name={notebookName}
        />

        <DeleteNotebook
          docId={notebook.docId}
          deleteNotebookModal={deleteNotebookModal}
          setDeleteNotebookModal={setDeleteNotebookModal}
        />
      </div>

      <section className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-3 gap-8 mb-12">
          {notes?.length > 0 ? (
            notes?.map((note) => (
              <Note
                key={note.docId}
                {...note}
                setDeleteNote={setDeleteNote}
                setSelectNoteId={setSelectNoteId}
                setEditNote={setEditNote}
                setNoteTitle={setNoteTitle}
                setNote={setNote}
              />
            ))
          ) : notes ? null : (
            <p>Loading...</p>
          )}

          {notes && (
            <AddNote createNote={createNote} setCreateNote={setCreateNote} />
          )}
        </div>

        <CreateNote
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
          note={note}
          setNote={setNote}
          createNoteModal={createNote}
          setCreateNoteModal={setCreateNote}
          notebookId={notebookId}
        />

        <EditNote
          note={note}
          setNote={setNote}
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
          editNoteModal={editNote}
          setEditNoteModal={setEditNote}
          selectNoteId={selectNoteId}
        />
        <DeleteNote
          docId={selectNoteId}
          deleteNote={deleteNote}
          setDeleteNote={setDeleteNote}
        />
      </section>
    </>
  );
}
