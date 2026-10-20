import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center mb-6">
      <NavLink to="/" className="text-2xl font-bold text-green-700">
        Employee Records
      </NavLink>
      <NavLink to="/create" className="border rounded-md px-3 py-2 hover:bg-slate-100">
        Create Employee
      </NavLink>
    </nav>
  );
}
