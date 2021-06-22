export default function Notebook({ notebookName, notebookId }) {
  return (
    <div className="h-40 bg-blue-300 w-20 mb-4 col-span-1 cursor-pointer">
      <p>{notebookName}</p>
    </div>
  );
}