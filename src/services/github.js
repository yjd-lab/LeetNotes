// fetch all folders inside your repository
export async function getGithubProblems() {
  const response = await fetch(
    "https://api.github.com/repos/yjd-lab/DSA-yj-/contents"
  );

  const data =
    await response.json();

  return data;
}

// fetch files inside one question folder
export async function getQuestionFiles(
  folderName
) {
  const response = await fetch(
    `https://api.github.com/repos/yjd-lab/DSA-yj-/contents/${folderName}`
  );

  const data =
    await response.json();

  return data;
}

// fetch contents of any text file
export async function getFileContent(
  fileUrl
) {
  const response =
    await fetch(fileUrl);

  const text =
    await response.text();

  return text;
}

export async function getQuestionDifficulty(
  folderName
) {
  const response =
    await fetch(
      `https://raw.githubusercontent.com/yjd-lab/DSA-yj-/main/${folderName}/README.md`
    );

  if (!response.ok) {
    return null;
  }

  const readme =
    await response.text();

  const match =
    readme.match(
      /Difficulty:\s*(Easy|Medium|Hard)/i
    );

  if (!match) {
    return null;
  }

  return match[1].toLowerCase();
}