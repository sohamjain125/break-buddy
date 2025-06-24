// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="bg-[#ffb842] w-full h-16 flex items-center justify-between px-8 rounded-b-2xl"
      style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
    >
      {/* Left - Logo */}
      <div className="text-2xl font-extrabold text-black tracking-wide">
        MyLogo
      </div>

      {/* Right - Navigation Links */}
      <div className="flex gap-8">
        <Link
          to="/"
          className="text-black hover:text-white font-medium transition"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="text-black hover:text-white font-medium transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
