import Modal from "react-modal";
import { firebase } from "../../lib/firebase";
import ReactQuill from "react-quill";

Modal.setAppElement("*");

interface Props {
  noteTitle: string;
  setNoteTitle: (s: string) => void;
  note: string;
  setNote: (s: string) => void;
  editNoteModal: boolean;
  setEditNoteModal: (s: boolean) => void;
  selectNoteId: string;
  setSelectNoteId: (s: string) => void;
}

const EditNote: React.FC<Props> = ({
  noteTitle,
  setNoteTitle,
  note,
  setNote,
  editNoteModal,
  setEditNoteModal,
  selectNoteId,
  setSelectNoteId,
}) => {
  function closeModal() {
    setEditNoteModal(false);
    setSelectNoteId("");
    setNoteTitle("");
    setNote("");
  }

  const updateNote = () => {
    try {
      firebase.firestore().collection("notes").doc(selectNoteId).update({
        note: note,
        noteTitle: noteTitle,
      });
      setNoteTitle("");
      setNote("");
      closeModal();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const noteUpdateHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (note && noteTitle) {
      updateNote();
    }
  };

  return (
    <div>
      <Modal
        isOpen={editNoteModal}
        onRequestClose={closeModal}
        className="modal lg:w-1/3"
        contentLabel="Edit Note Modal"
      >
        <span className="modal-header">
          <h2 className="text-xl font-semibold">Edit Note</h2>
          <button onClick={closeModal} className="focus:outline-none">
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

        <form onSubmit={noteUpdateHandler} className="flex flex-col">
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
            Update Note
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EditNote;
