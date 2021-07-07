import Modal from "react-modal";
import { firebase, FieldValue } from "../../lib/firebase";
import { useState } from "react";

Modal.setAppElement("*");

export default function EditNotebook({
  docId,
  editNotebook,
  setEditNotebook,
  name,
}) {
  const [notebookName, setNotebookName] = useState(() => name);

  function closeModal() {
    setEditNotebook(false);
  }

  const EditNotebook = () => {
    try {
      firebase.firestore().collection("notebooks").doc(docId).update({
        notebookName,
        userId: "fdklaadfawewzc",
        createdAt: FieldValue.serverTimestamp(),
      });
      setNotebookName("");
      setEditNotebook(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const notebookEditHandler = (e) => {
    e.preventDefault();

    if (notebookName) {
      EditNotebook();
    }
  };

  return (
    <div>
      <Modal
        isOpen={editNotebook}
        onRequestClose={closeModal}
        className="modal"
        contentLabel="Edit Notebook Modal"
      >
        <span className="modal-header">
          <h2 className="text-xl">Edit Notebook</h2>
          <button onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </span>

        <form onSubmit={notebookEditHandler} className="flex flex-col my-2">
          <input
            type="text"
            placeholder="Enter notebook name"
            className="input"
            value={notebookName}
            onChange={({ target }) => setNotebookName(target.value)}
          />

          <button className="button" type="submit">
            Edit Notebook
          </button>
        </form>
      </Modal>
    </div>
  );
}
