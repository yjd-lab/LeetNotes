import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddQuestion from "./pages/AddQuestion";
import Home from "./pages/Home";
import Problems from "./pages/Problems";
import Notes from "./pages/Notes";
import QuestionDetails from "./pages/QuestionDetails";
import NotesDetails from "./pages/NotesDetails";
import Navbar from "./components/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/problem/:id" element={<QuestionDetails />} />
        <Route path="/notes/:id" element={<NotesDetails />} />
        <Route path="/add-question" element={<AddQuestion />}/>
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;