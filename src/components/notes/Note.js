import parse from "html-react-parser";

export default function Note({ noteTitle, note, setDeleteNote }) {
  return (
    <div className="bg-blue-400 w-1/4 m-2 col-span-1">
      <h2>{noteTitle}</h2>

      <div>{parse(note)}</div>

      <span className="flex space-x-4">
        <button>Edit</button>
        <button onClick={() => setDeleteNote(true)}>Delete</button>
      </span>
    </div>
  );
}
