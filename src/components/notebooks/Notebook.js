import { Link } from "react-router-dom";

export default function Notebook({ notebookName, docId }) {
  return (
    <Link to={`/notebook/${docId}/${notebookName}`}>
      <div className="h-40 bg-blue-300 w-20 mb-4 col-span-1 cursor-pointer">
        {notebookName}
      </div>
    </Link>
  );
}
