import Modal from "react-modal";
import { firebase } from "../../lib/firebase";
import { useHistory } from "react-router-dom";

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

export default function DeleteNotebook({
  docId,
  deleteNotebookModal,
  setDeleteNotebookModal,
}) {
  const history = useHistory();

  function closeModal() {
    setDeleteNotebookModal(false);
  }

  const DeleteNotebook = () => {
    try {
      firebase.firestore().collection("notebooks").doc(docId).delete();
      history.push("/notebook");
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Modal
        isOpen={deleteNotebookModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Notebook Modal"
      >
        <h2 className="text-red-500">Delete Notebook</h2>
        <button onClick={closeModal}>close</button>
        <div>
          <p>Are you sure you want to delete notebook?</p>

          <span className="space-x-3">
            <button onClick={DeleteNotebook} className="text-red-500">
              Yes
            </button>
            <button onClick={closeModal}>Cancel</button>
          </span>
        </div>
      </Modal>
    </div>
  );
}
