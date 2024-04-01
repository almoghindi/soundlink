const express = require("express");
const auth = require("../middleware/auth");

const adminController = require("../controllers/admin-controller");

const router = express.Router();

router.get(
  "/user-count-by-profession",
  auth,
  adminController.professionDivider
);
router.get("/average-swipes", auth, adminController.getAverageSwipes);
router.get("/total-collabs", auth, adminController.getCollabsCount);
router.get("/total-new-users", auth, adminController.getNewUsersCount);

module.exports = router;
