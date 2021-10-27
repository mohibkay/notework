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

interface ParamsProps {
  notebookId: string;
  notebookName: string;
}

interface NotebookProps {
  docId: string;
  notebookName?: string;
}

interface NoteProps {
  docId: string;
  noteTitle: string;
  note: string;
  notebookId: string;
}

const Notes = () => {
  const [notebook, setNotebook] = useState<NotebookProps>();
  const [deleteNotebookModal, setDeleteNotebookModal] = useState(false);
  const [editNotebook, setEditNotebook] = useState(false);
  const { notebookId, notebookName } = useParams<ParamsProps>();

  const [notes, setNotes] = useState<NoteProps[]>();
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
        // @ts-ignore
        setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id })))
      );
    return () => unsubscribe();
  }, [notebookId]);

  console.log("note");
  console.log(notes);

  return (
    <>
      <Navbar />
      <main className="max-w-screen-lg mx-auto mt-8 px-6 lg:px-0 mb-2">
        <span className="flex items-center space-x-3">
          <h2 className="font-bold text-3xl mb-2 truncate">
            {notebook?.notebookName}
          </h2>

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

        {notebook ? (
          <>
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
          </>
        ) : null}

        <section className="">
          <div className="grid lg:grid-cols-3 lg:gap-8 mb-12">
            {notes ? (
              notes?.map((noteItem) => {
                const { noteTitle, note, docId } = noteItem;
                return (
                  <Note
                    key={docId}
                    docId={docId}
                    note={note}
                    noteTitle={noteTitle}
                    setDeleteNote={setDeleteNote}
                    setSelectNoteId={setSelectNoteId}
                    setEditNote={setEditNote}
                    setNoteTitle={setNoteTitle}
                    setNote={setNote}
                  />
                );
              })
            ) : (
              <p>Loading...</p>
            )}

            {notes && <AddNote setCreateNote={setCreateNote} />}
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
            setSelectNoteId={setSelectNoteId}
          />
          <DeleteNote
            docId={selectNoteId}
            deleteNote={deleteNote}
            setDeleteNote={setDeleteNote}
          />
        </section>
      </main>
    </>
  );
};

export default Notes;
