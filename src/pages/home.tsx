import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        style={{ height: "calc(100vh - 48px)" }}
        className="flex flex-col w-full items-center px-4 justify-center max-w-screen-lg mx-auto"
      >
        <img src="/images/hero.svg" className="md:w-4/5" alt="notebook" />
        <Link className="button px-4 mt-4 md:mt-0" to="/notebook">
          Browse
        </Link>
      </main>
    </>
  );
}
