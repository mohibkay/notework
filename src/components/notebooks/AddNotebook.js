import CreateNotebook from "../modals/CreateNotebook";

export default function AddNotebook({
  isModalOpen,
  setIsModalOpen,
  notebookName,
  setNotebookName,
}) {
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="h-40 bg-blue-300 w-20 col-span-1 cursor-pointer"
      >
        +
      </div>
      <CreateNotebook
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        notebookName={notebookName}
        setNotebookName={setNotebookName}
      />
    </>
  );
}
