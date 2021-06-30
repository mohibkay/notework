import Modal from "react-modal";
import parse from "html-react-parser";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    height: "60%",
  },
};

Modal.setAppElement("*");

export default function ReadNote({ noteTitle, note, readNote, setReadNote }) {
  const closeModal = (e) => {
    e.stopPropagation();
    setReadNote(false);
  };

  return (
    <div>
      <Modal
        isOpen={readNote}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Note Modal"
      >
        <span className="flex items-center justify-between my- border-b border-gray-base">
          <h2 className="py-4 text-xl">{noteTitle}</h2>
          <svg
            onClick={closeModal}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
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
        </span>
        <div className="p-4">{parse(note)}</div>
      </Modal>
    </div>
  );
}
