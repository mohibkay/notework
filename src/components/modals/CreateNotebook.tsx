import Modal from "react-modal";
import { firebase, FieldValue } from "../../lib/firebase";

Modal.setAppElement("*");

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (s: boolean) => void;
  notebookName: string;
  setNotebookName: (s: string) => void;
}

const CreateNotebook: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  notebookName,
  setNotebookName,
}) => {
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
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const notebookCreateHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (notebookName) {
      createNotebook();
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        contentLabel="Create Notebook Modal"
      >
        <span className="flex justify-between border-b border-gray-primary pb-3">
          <h2 className="text-xl">Create Notebook</h2>
          <button onClick={closeModal} className="focus:outline-none">
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
};

export default CreateNotebook;
