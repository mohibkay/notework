import Modal from "react-modal";
import firebase from "firebase";

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

export default function DeleteNote({ docId, deleteNote, setDeleteNote }) {
  function closeModal() {
    setDeleteNote(false);
  }

  const DeleteNote = () => {
    try {
      firebase.firestore().collection("notes").doc(docId).delete();
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Modal
        isOpen={deleteNote}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Notebook Modal"
      >
        <h2 className="text-red-500">Delete Note</h2>
        <button onClick={closeModal}>close</button>
        <div>
          <p>Are you sure you want to delete the note?</p>

          <span className="space-x-3">
            <button onClick={DeleteNote} className="text-red-500">
              Yes
            </button>
            <button onClick={closeModal}>Cancel</button>
          </span>
        </div>
      </Modal>
    </div>
  );
}
