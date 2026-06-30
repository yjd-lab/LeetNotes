import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <Link to="/">LEETNOTES</Link>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link to="/problems">Problems</Link>
        <Link to="/notes">Notes</Link>
        
      </div>
    </nav>
  );
}

export default Navbar;