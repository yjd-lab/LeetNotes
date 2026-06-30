import { useParams } from "react-router-dom";
import { useState } from "react";
import { getQuestions, saveQuestions } from "../utils/storage";

function NotesDetails() {

  const { id } = useParams();

  // load questions from storage
  const savedQuestions =
    getQuestions();

  const question =
    savedQuestions.find(
      (q) => q.id === Number(id)
    );

  const [notes, setNotes] =
    useState(question.notes);

  function handleSave() {

    const updatedQuestions =
      savedQuestions.map((q) => {

        if (q.id === Number(id)) {

          return {
            ...q,
            notes: notes,
          };
        }

        return q;
      });

    // save updated notes
    saveQuestions(updatedQuestions);
  }

  return (
    <div>

      <h1>{question.title}</h1>

      <textarea
        rows="10"
        cols="50"
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
      />

      <br />

      <button onClick={handleSave}>
        Save Notes
      </button>

    </div>
  );
}

export default NotesDetails;