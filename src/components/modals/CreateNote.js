import Modal from "react-modal";
import { firebase, FieldValue } from "../../lib/firebase";
import ReactQuill from "react-quill";

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

export default function CreateNote({
  noteTitle,
  setNoteTitle,
  note,
  setNote,
  createNoteModal,
  setCreateNoteModal,
  notebookId,
}) {
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
    } catch (error) {
      console.log(error.message);
    }
  };

  const noteCreateHandler = (e) => {
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
        style={customStyles}
        contentLabel="Create Notebook Modal"
      >
        <span className="flex justify-between my-4">
          <h2>Create Note</h2>
          <button onClick={closeModal}>close</button>
        </span>

        <form onSubmit={noteCreateHandler} className="flex flex-col">
          <label htmlFor="title">Note Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter note title"
            value={noteTitle}
            onChange={({ target }) => setNoteTitle(target.value)}
            className="mb-4"
          />
          <label htmlFor="note">Note</label>
          <div className="h-60">
            <ReactQuill
              id="note"
              value={note}
              onChange={(e) => setNote(e)}
              className="h-4/5"
            />
          </div>

          <button type="submit">Create Notebook</button>
        </form>
      </Modal>
    </div>
  );
}
