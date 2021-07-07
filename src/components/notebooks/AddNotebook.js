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
        className="flex flex-col justify-center items-center h-72 w-60 border border-dashed border-gray-base rounded-r-2xl col-span-4 lg:col-span-1 cursor-pointer"
      >
        <span>
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
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
        <span>Create Notebook</span>
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
