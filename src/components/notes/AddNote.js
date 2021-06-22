export default function AddNote({ setCreateNote }) {
  return (
    <>
      <div
        onClick={() => setCreateNote(true)}
        className="bg-blue-400 w-1/4 m-2 col-span-1 cursor-pointer"
      >
        +
      </div>
    </>
  );
}
