import { useEffect, useState } from "react";
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
    <div>
      <span className="flex items-center space-x-4">
        <h2>notebooks</h2>
        <p
          className="text-2xl cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </p>
      </span>
      <div className="grid grid-cols-4">
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
  );
}
