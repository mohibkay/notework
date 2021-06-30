import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-maroon text-white">
      <nav className="flex justify-between h-12 items-center max-w-screen-lg mx-auto">
        <Link to="/" className="p-4 font-semibold text-lg">
          Notework
        </Link>

        <ul>
          <li>Logout</li>
        </ul>
      </nav>
    </header>
  );
}
