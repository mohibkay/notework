import { Link } from "react-router-dom";

export default function Notebook({ notebookName, docId }) {
  return (
    <Link
      to={`/notebook/${docId}/${notebookName}`}
      className="h-72 bg-primary w-60 border border-gray-primary rounded-r-2xl col-span-3 lg:col-span-1 cursor-pointer relative mb-6 lg:mb-0"
    >
      <div className="absolute top-12 p-8 border-t border-b border-gray-primary bg-white w-full">
        <h2 className="text-xl">{notebookName}</h2>
      </div>
    </Link>
  );
}
