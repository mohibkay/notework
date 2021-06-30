import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import AddNotebook from "../components/notebooks/AddNotebook";
import Notebook from "../components/notebooks/Notebook";
import { firebase } from "../lib/firebase";

export default function Notebooks() {
  const [notebooks, setNotebooks] = useState(null);
  const [notebookName, setNotebookName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("notebooks")
      .onSnapshot((snapshot) =>
        setNotebooks(
          snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
        )
      );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto">
        <span className="flex items-center space-x-4">
          <h2 className="font-semibold text-2xl my-6">My Notebooks</h2>
          <svg
            onClick={() => setIsModalOpen(true)}
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </span>
        <div className="grid grid-cols-4 gap-10">
          {notebooks?.length > 0
            ? notebooks?.map((notebook) => (
                <Notebook key={notebook.docId} {...notebook} />
              ))
            : notebooks
            ? null
            : "Loading........"}

          {notebooks && (
            <AddNotebook
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              notebookName={notebookName}
              setNotebookName={setNotebookName}
            />
          )}
        </div>
      </div>
    </>
  );
}
