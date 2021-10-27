import Modal from "react-modal";
import parse from "html-react-parser";

Modal.setAppElement("*");
interface Props {
  noteTitle: string;
  note: string;
  readNote: boolean;
  setReadNote: (s: boolean) => void;
}

const ReadNote: React.FC<Props> = ({
  noteTitle,
  note,
  readNote,
  setReadNote,
}) => {
  const closeModal = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setReadNote(false);
  };

  return (
    <div>
      <Modal
        isOpen={readNote}
        onRequestClose={closeModal}
        className="modal lg:w-1/3"
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
};

export default ReadNote;
