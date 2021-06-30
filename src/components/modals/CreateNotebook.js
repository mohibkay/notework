import Modal from "react-modal";
import { firebase, FieldValue } from "../../lib/firebase";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
  },
};

Modal.setAppElement("*");

export default function CreateNotebook({
  isModalOpen,
  setIsModalOpen,
  notebookName,
  setNotebookName,
}) {
  // let subtitle;

  // function openModal() {
  //   setIsModalOpen(true);
  // }

  function afterOpenModal() {
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const createNotebook = () => {
    try {
      firebase.firestore().collection("notebooks").add({
        notebookName,
        userId: "fdklaadfawewzc",
        createdAt: FieldValue.serverTimestamp(),
      });
      setNotebookName("");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const notebookCreateHandler = (e) => {
    e.preventDefault();

    if (notebookName) {
      createNotebook();
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Notebook Modal"
      >
        <span className="flex justify-between border-b border-gray-primary pb-3">
          <h2 className="text-xl">Create Notebook</h2>
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

        <form onSubmit={notebookCreateHandler} className="flex flex-col my-2">
          <input
            type="text"
            placeholder="Enter notebook name"
            className="input"
            value={notebookName}
            onChange={({ target }) => setNotebookName(target.value)}
          />

          <button type="submit" className="button">
            Create Notebook
          </button>
        </form>
      </Modal>
    </div>
  );
}
