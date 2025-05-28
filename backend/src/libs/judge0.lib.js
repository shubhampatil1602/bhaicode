import axios from "axios";

export const rapidApiHeaders = {
  "x-rapidapi-key": process.env.JUDGE0_RAPID_API_KEY,
  "x-rapidapi-host": process.env.JUDGE0_RAPID_API_HOST,
};

export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };

  return languageMap[language.toUpperCase()];
};

export const submitBatch = async (submissions) => {
  const options = {
    url: `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
  };
  const { data } = await axios.post(
    options.url,
    {
      submissions,
    },
    {
      headers: rapidApiHeaders,
    }
  );

  return data;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens) => {
  const options = {
    url: `${process.env.JUDGE0_API_URL}/submissions/batch`,
  };
  while (true) {
    const { data } = await axios.get(options.url, {
      headers: rapidApiHeaders,
      params: {
        tokens: tokens.join(","),
        base64_encoded: false,
      },
    });

    const results = data.submissions;

    const isAllDone = results.every((result) => {
      return result.status.id !== 1 && result.status.id !== 2;
    });

    if (isAllDone) {
      return results;
    }

    await sleep(1000);
  }
};

export const getLanguageName = (languageId) => {
  const LANGUAGE_NAMES = {
    74: "TYPESCRIPT",
    63: "JAVASCRIPT",
    71: "PYTHON",
    62: "JAVA",
  };

  return LANGUAGE_NAMES[languageId] || "UNKNOWN";
};
