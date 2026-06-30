import { useState } from "react";
import { getQuestions, saveQuestions } from "../utils/storage";
import { useNavigate } from "react-router-dom";

function AddQuestion() {

  // stores the value typed in ID box
  const [id, setId] = useState("");

  // stores the value typed in Title box
  const [title, setTitle] = useState("");

  // stores the value typed in Tags box
  const [tags, setTags] = useState("");

  // used for routing after question is added
  const navigate = useNavigate();

  const [difficulty,setDifficulty,] = useState("Easy");

  function handleAddQuestion() {

    // get all existing questions from localStorage
    const questions = getQuestions();

    // create a new question object
    const newQuestion = {
      id: Number(id),

      title: title,

      // convert:
      // "stack,array"
      // into:
      // ["stack", "array"]
      tags: tags.split(","),

      // default values
      status: "easy",
      notes: "",
      solution: "",

      revisionCount: 0,
      lastRevised: "",
    };

    // add new question to existing array
    const updatedQuestions = [
      ...questions,
      newQuestion,
    ];

    // save updated array back to localStorage
    saveQuestions(updatedQuestions);

    // clear form after adding
    setId("");
    setTitle("");
    setTags("");

    // send user back to Problems page
    navigate("/problems");
  }

  return (
    <div>

      <h1>Add Question</h1>

      {/* Question ID */}
      <input
        type="number"
        placeholder="Question ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <br />
      <br />

      {/* Question Title */}
      <input
        type="text"
        placeholder="Question Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      {/* Tags separated by commas */}
      <input
        type="text"
        placeholder="stack,array,hashmap"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <br />
      <br />

      <select
        value={difficulty}
        onChange={(e)=>
          setDifficulty(
            e.target.value
          )
        }
      >

      <option>
        Easy
      </option>

      <option>
      Medium
      </option>

      <option>
      Hard
      </option>

      </select>

      <button onClick={handleAddQuestion}>
        Add Question
      </button>

    </div>
  );
}

export default AddQuestion;