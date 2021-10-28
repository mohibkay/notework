import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className="bg-maroon text-white">
      <nav className="flex justify-between h-12 items-center max-w-screen-lg mx-auto">
        <Link to="/" className="p-4 lg:p-0 font-semibold text-lg">
          Notework
        </Link>

        <ul className="hidden">
          <li>Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
