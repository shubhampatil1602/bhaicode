import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

const createProblem = async (req, res) => {
  // get all data from body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippet,
    referenceSolutions,
  } = req.body;

  // check user role admin/user
  const userRole = req.user.role;
  if (userRole !== "ADMIN")
    return res
      .status(403)
      .json({ message: "You are not allowed to create a problem" });

  // loop through each reference solution for different languages
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      console.log(language, languageId);
      if (!languageId)
        return res.status(400).json({ error: `Invalid language: ${language}` });

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("results------ ", result);
        // if (result.status.id !== 3) {
        //   return res.status(400).json({
        //     error: `Testcase ${i + 1} for ${language} failed`,
        //   });
        // }
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} for ${language} failed`,
            details: {
              status: result.status.description,
              message: result.message,
              stderr: result.stderr,
              compile_output: result.compile_output,
            },
          });
        }
      }

      // save the problem to db
      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippet,
          referenceSolutions,
          userId: req.user.id,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Problem created successfully",
        problem: newProblem,
      });
    }
  } catch (error) {
    console.error("error creating problem: ", error);
    return res.status(500).json({ error: "Error creating problem" });
  }
};

const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany();

    if (!problems) {
      return res.status(404).json({ error: "No problems found" });
    }

    return res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      problems,
    });
  } catch (error) {
    console.error("error fetching problem: ", error);
    return res.status(500).json({ error: "Error fetching problem" });
  }
};

const getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    const problemById = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problemById) {
      return res.status(404).json({ error: "No problem found" });
    }

    return res.status(200).json({
      success: true,
      message: "Problem fetched successfully",
      problem: problemById,
    });
  } catch (error) {
    console.error("error fetching problem: ", error);
    return res.status(500).json({ error: "Error fetching problem" });
  }
};

const updateProblem = async (req, res) => {
  const { id } = req.params;

  // get all data from body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippet,
    referenceSolutions,
  } = req.body;

  // check user role admin/user
  const userRole = req.user.role;
  if (userRole !== "ADMIN")
    return res
      .status(403)
      .json({ message: "You are not allowed to create a problem" });

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });
    if (!problem) {
      return res.status(404).json({ error: "No problem found" });
    }

    // loop through each reference solution for different languages
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      console.log(language, languageId);
      if (!languageId)
        return res.status(400).json({ error: `Invalid language: ${language}` });

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("results------ ", result);
        // if (result.status.id !== 3) {
        //   return res.status(400).json({
        //     error: `Testcase ${i + 1} for ${language} failed`,
        //   });
        // }
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} for ${language} failed`,
            details: {
              status: result.status.description,
              message: result.message,
              stderr: result.stderr,
              compile_output: result.compile_output,
            },
          });
        }
      }

      // save the problem to db
      const updatedProblem = await db.problem.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippet,
          referenceSolutions,
          userId: req.user.id,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Problem updated successfully",
        problem: updatedProblem,
      });
    }
  } catch (error) {
    console.error("error updating problem: ", error);
    return res.status(500).json({ error: "Error updating problem" });
  }
};

const deleteProblem = async (req, res) => {
  const { id } = req.params;

  // check user role admin/user
  const userRole = req.user.role;
  if (userRole !== "ADMIN")
    return res
      .status(403)
      .json({ message: "You are not allowed to create a problem" });

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });
    if (!problem) {
      return res.status(404).json({ error: "No problem found" });
    }
    await db.problem.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    console.error("error deleting problem: ", error);
    return res.status(500).json({ error: "Error deleting problem" });
  }
};

const getAllProblemsSolvedByUser = async (req, res) => {};

export {
  createProblem,
  deleteProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  getAllProblemsSolvedByUser,
};
