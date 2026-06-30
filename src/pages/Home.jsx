import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function handleSearch() {

    navigate(`/problems?search=${search}`);

  }

  return (
    <div>

      <h1>LEETNOTES</h1>

      <input
        type="text"
        placeholder="Search problems..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

    </div>
  );
}

export default Home;