import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ReactMarkdown
  from "react-markdown";

import rehypeRaw
  from "rehype-raw";

import { getQuestions } from "../utils/storage";
import {
  getQuestionFiles,
  getFileContent,
  
} from "../services/github";

function QuestionDetails() {
  const { id } = useParams();

  // load questions from localStorage
  const questionsData =
    getQuestions();

  const question =
    questionsData.find(
      (q) => q.id === Number(id)
    );

  // stores java code
  const [solution, setSolution] =
    useState("Loading solution...");

  // stores README contents
  const [
    problemStatement,
    setProblemStatement,
  ] = useState(
    "Loading problem statement..."
  );

  // runs when page opens
  useEffect(() => {
    async function loadData() {
      // question deleted / doesn't exist
      if (!question) {
        return;
      }

      // example:
      // 1 + Two Sum
      // -> 1-two-sum
      const folderName =
        `${question.id}-${question.title
          .toLowerCase()
          .replaceAll(" ", "-")}`;

      try {
        // get files inside folder
        const files =
          await getQuestionFiles(
            folderName
          );

        // find README.md
        const readmeFile =
          files.find(
            (file) =>
              file.name ===
              "README.md"
          );

        if (readmeFile) {
          const readme =
            await getFileContent(
              readmeFile.download_url
            );

          setProblemStatement(
            readme
          );
        }

        // find .java file
        const solutionFile =
          files.find(
            (file) =>
              file.name.endsWith(
                ".java"
              )
          );

        // if no java file exists
        if (!solutionFile) {
          setSolution(
            "No solution found."
          );
          return;
        }

        // download java code
        const code =
          await getFileContent(
            solutionFile.download_url
          );

        setSolution(code);
      }

      catch (error) {
        console.error(error);

        setSolution(
          "Failed to load solution."
        );

        setProblemStatement(
          "Failed to load problem statement."
        );
      }
    }

    loadData();
  }, [question]);

  // safety check
  if (!question) {
    return (
      <h1>
        Question not found
      </h1>
    );
  }

  return (
    <div>
      <h1>
        {question.id} - {question.title}
      </h1>

      <h2>
        Problem Statement
      </h2>

      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
      >
        {problemStatement}
      </ReactMarkdown>

      <h2>
        Solution
      </h2>

      <pre>
        <code>
          {solution}
        </code>
      </pre>
    </div>
  );
}

export default QuestionDetails;