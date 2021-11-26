const router = require("express").Router();
const userController = require("../controllers/userController");

//search user by license plate
router.get("/search/:licensePlate", userController.searchUser);
//update user
router.put("/:id", userController.updateUser);
//delete user
router.delete("/:id", userController.deleteUser);
//get a user
router.get("/:id", userController.getUser);

module.exports = router;
