import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteNotebook from "../components/modals/DeleteNotebook";
import EditNotebook from "../components/modals/EditNotebook";
import firebase from "../lib/firebase";

export default function Notes() {
  const [notebook, setNotebook] = useState("");
  const [deleteNotebookModal, setDeleteNotebookModal] = useState(false);
  const [editNotebook, setEditNotebook] = useState(false);
  const { notebookId, notebookName } = useParams();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("notebooks")
      .doc(notebookId)
      .onSnapshot((doc) => setNotebook({ ...doc.data(), docId: doc.id }));

    return () => unsubscribe();
  }, [notebookId]);

  //   const notebookDeleteHandler = () => {
  //   };

  console.log(notebook, notebookName);
  return (
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
  );
}
