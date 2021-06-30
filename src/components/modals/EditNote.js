import Modal from "react-modal";
import { firebase } from "../../lib/firebase";
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

export default function EditNote({
  noteTitle,
  setNoteTitle,
  note,
  setNote,
  editNoteModal,
  setEditNoteModal,
  notebookId,
  selectNoteId,
}) {
  function closeModal() {
    setEditNoteModal(false);
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
    } catch (error) {
      console.log(error.message);
    }
  };

  const noteUpdateHandler = (e) => {
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
        style={customStyles}
        contentLabel="Edit Note Modal"
      >
        <span className="flex justify-between my-4">
          <h2>Edit Note</h2>
          <button onClick={closeModal}>close</button>
        </span>

        <form onSubmit={noteUpdateHandler} className="flex flex-col">
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

          <button type="submit">Update Notebook</button>
        </form>
      </Modal>
    </div>
  );
}
