
export function Navbar() {

  return (
    <nav className="bg-blue-500 p-4" id="navbar">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-white text-2xl font-bold">
          Med Ex
        </a>

        <ul className="flex space-x-10">
          <li>
            <a href="/" className="text-white">
              Register
            </a>
          </li>
          <li>
            <a href="/view" className="text-white">
              Approve
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="text-white mr-5">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
