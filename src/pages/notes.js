import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateNote from "../components/modals/CreateNote";
import DeleteNote from "../components/modals/DeleteNote";
import DeleteNotebook from "../components/modals/DeleteNotebook";
import EditNotebook from "../components/modals/EditNotebook";
import AddNote from "../components/notes/AddNote";
import Note from "../components/notes/Note";
import firebase from "../lib/firebase";

export default function Notes() {
  const [notebook, setNotebook] = useState("");
  const [deleteNotebookModal, setDeleteNotebookModal] = useState(false);
  const [editNotebook, setEditNotebook] = useState(false);
  const { notebookId, notebookName } = useParams();

  const [notes, setNotes] = useState([]);
  const [createNote, setCreateNote] = useState(false);
  const [deleteNote, setDeleteNote] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [note, setNote] = useState("");
  const [selectNoteIdForDeletion, setSelectNoteIdForDeletion] = useState("");

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
      <div className="">
        <span className="flex space-x-3">
          <h2>{notebook.notebookName}</h2>
          <button onClick={() => setEditNotebook(true)}>Edit</button>
          <button onClick={() => setDeleteNotebookModal(true)}>Delete</button>
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

      <section>
        <div className="grid grid-cols-3">
          {notes.map((note) => (
            <Note
              key={note.docId}
              {...note}
              setDeleteNote={setDeleteNote}
              setSelectNoteIdForDeletion={setSelectNoteIdForDeletion}
            />
          ))}

          <AddNote createNote={createNote} setCreateNote={setCreateNote} />
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
        <DeleteNote
          docId={selectNoteIdForDeletion}
          deleteNote={deleteNote}
          setDeleteNote={setDeleteNote}
        />
      </section>
    </>
  );
}
