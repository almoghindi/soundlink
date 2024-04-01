const User = require("../models/user");
const Collab = require("../models/collab");
const moment = require("moment");
const HttpError = require("../models/http-error");

const professionDivider = async (req, res, next) => {
  try {
    const professionCounts = await User.aggregate([
      {
        $group: {
          _id: "$profession",
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedCounts = professionCounts.map((item) => ({
      name: item._id,
      value: item.count,
    }));

    res.json(formattedCounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAverageSwipes = async (req, res) => {
  try {
    const now = moment();
    const periods = {
      Week: now.clone().subtract(1, "weeks").startOf("day").toDate(),
      Month: now.clone().subtract(1, "months").startOf("day").toDate(),
      HalfYear: now.clone().subtract(6, "months").startOf("day").toDate(),
      Year: now.clone().subtract(1, "years").startOf("day").toDate(),
    };

    const formattedResults = [];

    for (const [period, startDate] of Object.entries(periods)) {
      const matchStage = {
        $match: {
          $or: [
            { "ILiked.likedAt": { $gte: startDate } },
            { "IDisliked.dislikedAt": { $gte: startDate } },
          ],
        },
      };

      const projectStage = {
        $project: {
          totalSwipes: {
            $size: {
              $filter: {
                input: { $concatArrays: ["$ILiked", "$IDisliked"] },
                as: "swipe",
                cond: { $gte: ["$$swipe.likedAt", startDate] },
              },
            },
          },
        },
      };

      const groupStage = {
        $group: {
          _id: null,
          totalSwipes: { $sum: "$totalSwipes" },
          activeUsers: { $sum: 1 },
        },
      };

      const projectFinalStage = {
        $project: {
          _id: 0,
          averageSwipes: { $divide: ["$totalSwipes", "$activeUsers"] },
        },
      };

      const aggregationPipeline = [
        matchStage,
        projectStage,
        groupStage,
        projectFinalStage,
      ];

      const [data] = await User.aggregate(aggregationPipeline);

      formattedResults.push({
        name: period,
        value: data ? data.averageSwipes : 0,
      });
    }

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error("Error retrieving average swipes data:", error);
    res.status(500).json({
      message: "An error occurred while retrieving average swipes data",
      error: error.toString(),
    });
  }
};

const getCollabsCount = async (req, res) => {
  try {
    const now = new Date();
    const periods = {
      Week: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      Month: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      HalfYear: new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000),
      Year: new Date(now.getTime() - 12 * 30 * 24 * 60 * 60 * 1000),
    };

    const formattedResults = [];

    for (const [period, startDate] of Object.entries(periods)) {
      const count = await Collab.countDocuments({
        collabAt: { $gte: startDate, $lte: now },
      });

      formattedResults.push({
        name: period,
        value: count,
      });
    }

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error("Error retrieving collab counts:", error);
    res.status(500).json({
      message: "An error occurred while retrieving collab counts",
      error: error.toString(),
    });
  }
};

const getNewUsersCount = async (req, res) => {
  try {
    const now = new Date();
    const periods = {
      Week: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      Month: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      HalfYear: new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000),
      Year: new Date(now.getTime() - 12 * 30 * 24 * 60 * 60 * 1000),
    };

    const formattedResults = [];

    for (const [period, startDate] of Object.entries(periods)) {
      const count = await User.countDocuments({
        registeredAt: { $gte: startDate, $lte: now },
      });

      formattedResults.push({
        name: period,
        value: count,
      });
    }

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error("Error retrieving new users count:", error);
    res.status(500).json({
      message: "An error occurred while retrieving new users count",
      error: error.toString(),
    });
  }
};

exports.professionDivider = professionDivider;
exports.getAverageSwipes = getAverageSwipes;
exports.getCollabsCount = getCollabsCount;
exports.getNewUsersCount = getNewUsersCount;
