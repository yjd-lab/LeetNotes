import QuestionCard from "../components/QuestionCard";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import {
  getQuestions,
  saveQuestions,
} from "../utils/storage";

function Notes() {

  // load questions from storage
  const [questionsData, setQuestionsData] =
    useState(getQuestions());

  const [search, setSearch] =
    useState("");

  // which field to search in
  const [searchIn, setSearchIn] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");

  // sorting option
  const [sortBy, setSortBy] =
    useState("mostRevisions");

  // change difficulty status
  function handleStatusChange(id) {

    const updatedQuestions =
      questionsData.map((question) => {

        if (question.id === id) {

          let newStatus = "";

          if (question.status === "easy") {
            newStatus = "medium";
          }

          else if (question.status === "medium") {
            newStatus = "hard";
          }

          else {
            newStatus = "easy";
          }

          return {
            ...question,
            status: newStatus,
          };
        }

        return question;
      });

    setQuestionsData(updatedQuestions);
  }

  // increase revision count
  function handleRevisionIncrease(id) {

    const updatedQuestions =
      questionsData.map((question) => {

        if (question.id === id) {

          return {
            ...question,

            revisionCount:
              question.revisionCount + 1,

            lastRevised:
              new Date().toLocaleDateString(),
          };
        }

        return question;
      });

    setQuestionsData(updatedQuestions);
  }

  // decrease revision count
  function handleRevisionDecrease(id) {

    const updatedQuestions =
      questionsData.map((question) => {

        if (question.id === id) {

          return {
            ...question,

            revisionCount:
              Math.max(
                0,
                question.revisionCount - 1
              ),
          };
        }

        return question;
      });

    setQuestionsData(updatedQuestions);
  }

  // save whenever questions change
  useEffect(() => {

    saveQuestions(questionsData);

  }, [questionsData]);

  return (
    <div>

      <h1>NOTES PAGE</h1>

      <div>

        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Search notes..."
        />

        <select
          value={searchIn}
          onChange={(e) =>
            setSearchIn(e.target.value)
          }
        >

          <option value="all">
            All
          </option>

          <option value="title">
            Title
          </option>

          <option value="tags">
            Tags
          </option>

          <option value="status">
            Status
          </option>

          <option value="notes">
            Notes
          </option>

        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
        >

          <option value="all">
            All
          </option>

          <option value="easy">
            Easy
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="hard">
            Hard
          </option>

        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
        >

          <option value="mostRevisions">
            Most Revisions
          </option>

          <option value="leastRevisions">
            Least Revisions
          </option>

          <option value="newest">
            Newest Added
          </option>

          <option value="oldest">
            Oldest Added
          </option>

        </select>

      </div>

      {questionsData

        .filter((question) => {

          const searchText =
            search.toLowerCase();

          let matchesSearch =
            false;

          if (
            searchIn === "all"
          ) {

            matchesSearch = (

              question.title
                .toLowerCase()
                .includes(
                  searchText
                )

              ||

              question.id
                .toString()
                .includes(
                  searchText
                )

              ||

              question.tags.some(
                (tag) =>
                  tag
                    .toLowerCase()
                    .includes(
                      searchText
                    )
              )

              ||

              question.status
                .toLowerCase()
                .includes(
                  searchText
                )

              ||

              (
                question.notes || ""
              )
                .toLowerCase()
                .includes(
                  searchText
                )

            );
          }

          else if (
            searchIn === "title"
          ) {

            matchesSearch =
              question.title
                .toLowerCase()
                .includes(
                  searchText
                );
          }

          else if (
            searchIn === "tags"
          ) {

            matchesSearch =
              question.tags.some(
                (tag) =>
                  tag
                    .toLowerCase()
                    .includes(
                      searchText
                    )
              );
          }

          else if (
            searchIn === "status"
          ) {

            matchesSearch =
              question.status
                .toLowerCase()
                .includes(
                  searchText
                );
          }

          else if (
            searchIn === "notes"
          ) {

            matchesSearch =
              (
                question.notes || ""
              )
                .toLowerCase()
                .includes(
                  searchText
                );
          }

          const matchesStatus =

            statusFilter ===
              "all"

            ||

            question.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );

        })

        .sort((a, b) => {

          if (
            sortBy ===
            "mostRevisions"
          ) {

            return (
              b.revisionCount -
              a.revisionCount
            );
          }

          if (
            sortBy ===
            "leastRevisions"
          ) {

            return (
              a.revisionCount -
              b.revisionCount
            );
          }

          if (
            sortBy ===
            "newest"
          ) {

            return (
              b.id - a.id
            );
          }

          if (
            sortBy ===
            "oldest"
          ) {

            return (
              a.id - b.id
            );
          }

          return 0;

        })

        .map((question) => (

          <QuestionCard
            key={question.id}
            id={question.id}
            title={question.title}
            status={question.status}
            revisionCount={
              question.revisionCount
            }
            lastRevised={
              question.lastRevised
            }
            type="notes"
            onStatusClick={
              handleStatusChange
            }
            onRevisionIncrease={
              handleRevisionIncrease
            }
            onRevisionDecrease={
              handleRevisionDecrease
            }
          />

        ))}

    </div>
  );
}

export default Notes;