const User = require("../models/user");
const HttpError = require("../models/http-error");
const Collab = require("../models/collab");
const getBestMatches = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    let conditions = {
      _id: { $ne: req.params.userId },
    };

    conditions._id.$nin = user.IDisliked.map((disliked) => disliked._id);
    conditions._id.$nin.push(...user.ILiked.map((liked) => liked._id));

    if (user.profession === "Producer") {
      conditions.profession = { $in: ["Rapper", "Singer", "Player"] };
    } else {
      conditions.profession = "Producer";
    }

    let recommendedUsers;
    if (!user.isPremium) {
      recommendedUsers = await User.find(conditions).limit(10);
    } else {
      recommendedUsers = await User.find(conditions);
    }

    res.status(201).json({ recommendedUsers });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }
};

const swipe = async (req, res, next) => {
  try {
    const { myId, liked, disliked } = req.body;
    const user = await User.findById(myId);

    if (!user) {
      const error = new HttpError(
        "Something went wrong, please try again.",
        401
      );
      return next(error);
    }
    if (
      user.ILiked.some((element) => liked.includes(element)) ||
      user.ILiked.some((element) => disliked.includes(element)) ||
      user.IDisliked.some((element) => liked.includes(element)) ||
      user.IDisliked.some((element) => disliked.includes(element))
    ) {
      const error = new HttpError("You have already swipe this user.", 500);
      return next(error);
    }
    user.ILiked.push(...liked);
    user.IDisliked.push(...disliked);

    await user.save();
    res.json("User swipe sucessfully.");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }
};

const newCollabs = async (req, res, next) => {
  try {
    const { collabs } = req.body;

    await Collab.insertMany(collabs);

    res.json({ message: "collabs added succesfully!" });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }
};

const myCollabs = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const collabs = await Collab.find({
      $or: [{ user1Id: userId }, { user2Id: userId }],
    });

    const collabPartners = await Promise.all(
      collabs.map(async (collab) => {
        const partnerId = collab.user1Id.equals(userId)
          ? collab.user2Id
          : collab.user1Id;

        const partner = await User.findById(partnerId);
        return partner;
      })
    );

    res.status(201).json({ collabPartners });
  } catch (err) {
    next(err);
  }
};

exports.getBestMatches = getBestMatches;
exports.swipe = swipe;
exports.newCollabs = newCollabs;
exports.myCollabs = myCollabs;
