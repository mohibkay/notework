import Modal from "react-modal";
import { firebase, FieldValue } from "../../lib/firebase";
import ReactQuill from "react-quill";

Modal.setAppElement("*");

interface Props {
  noteTitle: string;
  setNoteTitle: (s: string) => void;
  note: string;
  setNote: (s: string) => void;
  createNoteModal: boolean;
  setCreateNoteModal: (s: boolean) => void;
  notebookId: string;
}

const CreateNote: React.FC<Props> = ({
  noteTitle,
  setNoteTitle,
  note,
  setNote,
  createNoteModal,
  setCreateNoteModal,
  notebookId,
}) => {
  function closeModal() {
    setCreateNoteModal(false);
  }

  const createNote = () => {
    try {
      firebase.firestore().collection("notes").add({
        note,
        noteTitle,
        notebookId,
        userId: "fdklaadfawewzc",
        createdAt: FieldValue.serverTimestamp(),
      });
      setNoteTitle("");
      setNote("");
      closeModal();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const noteCreateHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (note && noteTitle) {
      createNote();
    }
  };

  return (
    <div>
      <Modal
        isOpen={createNoteModal}
        onRequestClose={closeModal}
        className="modal lg:w-1/3"
        contentLabel="Create Notebook Modal"
      >
        <span className="modal-header">
          <h2 className="text-xl font-semibold">Create Note</h2>
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

        <form onSubmit={noteCreateHandler} className="flex flex-col">
          <label htmlFor="title" className="text-lg -mb-1">
            Note Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter note title"
            value={noteTitle}
            onChange={({ target }) => setNoteTitle(target.value)}
            className="mb-4 input"
          />
          <label htmlFor="note" className="text-lg mb-1">
            Note
          </label>
          <div className="h-60">
            <ReactQuill
              id="note"
              value={note}
              onChange={(e) => setNote(e)}
              className="h-4/5"
            />
          </div>

          <button type="submit" className="button mt-8">
            Create Note
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateNote;
