import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import AddNotebook from "../components/notebooks/AddNotebook";
import Notebook from "../components/notebooks/Notebook";
import { firebase } from "../lib/firebase";

interface notebooksProps {
  docId: string;
  notebookName: string;
}

const Notebooks = () => {
  const [notebooks, setNotebooks] = useState<notebooksProps[]>();
  const [notebookName, setNotebookName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("notebooks")
      .onSnapshot((snapshot) =>
        setNotebooks(
          // @ts-ignore
          snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
        )
      );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col max-w-screen-lg px-4 lg:px-0 mx-auto pb-8">
        <section className="flex items-center space-x-2">
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
        </section>

        <section className="grid grid-cols-4 justify-items-stretch lg:justify-items-start gap-6 lg:gap-10">
          {notebooks
            ? notebooks?.map((notebook) => {
                const { notebookName, docId } = notebook;
                return (
                  <Notebook
                    key={docId}
                    notebookName={notebookName}
                    docId={docId}
                  />
                );
              })
            : "Loading........"}

          {notebooks && (
            <AddNotebook
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              notebookName={notebookName}
              setNotebookName={setNotebookName}
            />
          )}
        </section>
      </main>
    </>
  );
};

export default Notebooks;
