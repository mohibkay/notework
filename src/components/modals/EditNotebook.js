import Modal from "react-modal";
import firebase from "firebase";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

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
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
        style={customStyles}
        contentLabel="Edit Notebook Modal"
      >
        <h2>Edit Notebook</h2>
        <button onClick={closeModal}>X</button>
        <form onSubmit={notebookEditHandler}>
          <input
            type="text"
            placeholder="Enter notebook name"
            value={notebookName}
            onChange={({ target }) => setNotebookName(target.value)}
          />

          <button type="submit">Edit Notebook</button>
        </form>
      </Modal>
    </div>
  );
}
