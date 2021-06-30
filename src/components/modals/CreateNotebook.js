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
        <h2>Create Notebook</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form onSubmit={notebookCreateHandler}>
          <input
            type="text"
            placeholder="Enter notebook name"
            value={notebookName}
            onChange={({ target }) => setNotebookName(target.value)}
          />

          <button type="submit">Create Notebook</button>
        </form>
      </Modal>
    </div>
  );
}
