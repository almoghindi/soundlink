const express = require("express");

const auth = require("../middleware/auth");
const matchesController = require("../controllers/matches-controller");

const router = express.Router();

router.get("/:userId", auth, matchesController.getBestMatches);
router.post("/swipe", auth, matchesController.swipe);
router.post("/new-collabs", auth, matchesController.newCollabs);
router.get("/my-collabs/:userId", auth, matchesController.myCollabs);
module.exports = router;
