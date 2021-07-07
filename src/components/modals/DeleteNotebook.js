import Modal from "react-modal";
import { firebase } from "../../lib/firebase";
import { useHistory } from "react-router-dom";

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
        className="modal"
        contentLabel="Delete Notebook Modal"
      >
        <span className="modal-header">
          <h2 className="text-red-500">Delete Notebook</h2>
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
          <p className="text-lg">
            Are you sure you want to delete the notebook?
          </p>

          <button onClick={DeleteNotebook} className="button w-full mt-5">
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
