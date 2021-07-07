export default function AddNote({ setCreateNote }) {
  return (
    <>
      <div
        onClick={() => setCreateNote(true)}
        className="flex justify-center items-center w-full h-60 rounded-md -mb-2 border border-dashed border-gray-base col-span-3 lg:col-span-1 cursor-pointer"
      >
        <span className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 text-center"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl">Create Note</h2>
        </span>
      </div>
    </>
  );
}
