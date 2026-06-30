import { useState,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

import QuestionCard from "../components/QuestionCard";
import SearchBar from "../components/SearchBar";
import { getQuestions, saveQuestions } from "../utils/storage";
import { getGithubProblems } from "../services/github";

function Problems() {
  const [searchParams] = useSearchParams();

  const initialSearch =
    searchParams.get("search") || "";

  const [search, setSearch] =
    useState(initialSearch);

  // load questions from localStorage
  const [questionsData, setQuestionsData] =
    useState(getQuestions());

  // sync from GitHub once
  useEffect(() => {
    handleGithubSync();
  }, []);

  // delete question
  function handleDelete(id) {
    const updatedQuestions =
      questionsData.filter(
        (question) =>
          question.id !== id
      );

    saveQuestions(updatedQuestions);
    setQuestionsData(updatedQuestions);
  }

  // sync questions from GitHub
  async function handleGithubSync() {
    const data =
      await getGithubProblems();

    const githubQuestions =
      data
        .filter(
          (item) =>
            item.type === "dir"
        )
        .map((item) => {
          const parts =
            item.name.split("-");

          const id =
            Number(parts[0]);

          const title =
            parts
              .slice(1)
              .map(
                (word) =>
                  word.charAt(0)
                    .toUpperCase() +
                  word.slice(1)
              )
              .join(" ");

          return {
            id,
            title,
            tags: [],
            problemStatement: "",
            solution: "",
            notes: "",
            status: "easy",
            revisionCount: 0,
            lastRevised: "",
          };
        });

    const mergedQuestions =
      githubQuestions.map(
        (githubQuestion) => {
          const existingQuestion =
            questionsData.find(
              (question) =>
                question.id ===
                githubQuestion.id
            );

          if (existingQuestion) {
            return existingQuestion;
          }

          return githubQuestion;
        }
      );

    saveQuestions(mergedQuestions);
    setQuestionsData(mergedQuestions);
  }

  return (
    <div>
      <h1>PROBLEMS PAGE</h1>

      <Link to="/add-question">
        <button>
          Add Question
        </button>
      </Link>

      

      <div>
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Search problems..."
        />
      </div>

      {questionsData
        .filter((question) => {
          const searchText =
            search.toLowerCase();

          return (
            question.title
              .toLowerCase()
              .includes(searchText) ||

            question.id
              .toString()
              .includes(searchText) ||

            question.tags.some(
              (tag) =>
                tag
                  .toLowerCase()
                  .includes(searchText)
            )
          );
        })
        .map((question) => (
          <QuestionCard
            key={question.id}
            id={question.id}
            title={question.title}
            onDelete={handleDelete}
          />
        ))}
    </div>
  );
}

export default Problems;