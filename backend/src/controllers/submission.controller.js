import { db } from "../libs/db.js";

const getAllSubmissions = async (req, res) => {
  try {
    const userId = req.user.id;
    const submissions = await db.submission.findMany({
      where: {
        userId,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to fetch submissions",
    });
  }
};

const getSubmissionsForProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { problemId } = req.params;
    const submissions = await db.submission.findMany({
      where: {
        userId,
        problemId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to fetch submissions for problem",
    });
  }
};

const getAllSubmissionsCountForProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    const submissions = await db.submission.count({
      where: {
        problemId,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      count: submissions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to fetch submissions for problem",
    });
  }
};

export {
  getAllSubmissions,
  getSubmissionsForProblem,
  getAllSubmissionsCountForProblem,
};
