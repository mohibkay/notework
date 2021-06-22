import Modal from "react-modal";
import firebase from "firebase";

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
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
        <div>I am a modal</div>

        <form onSubmit={noteCreateHandler} className="flex flex-col ">
          <input
            type="text"
            placeholder="Enter note title"
            value={noteTitle}
            onChange={({ target }) => setNoteTitle(target.value)}
          />
          <input
            type="text"
            placeholder="Enter note"
            value={note}
            onChange={({ target }) => setNote(target.value)}
          />

          <button type="submit">Create Notebook</button>
        </form>
      </Modal>
    </div>
  );
}
