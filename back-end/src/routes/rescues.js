const router = require("express").Router();
const rescueController = require("../controllers/rescueController");

//create a post

router.post("/", rescueController.newRescue);

router.get("/list", rescueController.getAllRescue);
//update a post

//get by category
router.get("/find/:areaEnum", rescueController.getRescueByCategory);

module.exports = router;
