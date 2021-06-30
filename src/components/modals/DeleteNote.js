import Modal from "react-modal";
import { firebase } from "../../lib/firebase";

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
        <span className="modal-header">
          <h2 className="text-xl">Delete Note</h2>
          <button onClick={closeModal}>
            {" "}
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

        <div>
          <p className="text-lg">Are you sure you want to delete the note?</p>

          <button onClick={DeleteNote} className="button w-full mt-5">
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
