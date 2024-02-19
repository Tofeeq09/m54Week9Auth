// External Dependencies
const { Router } = require("express"); // Import the express Router module.

// Internal Dependencies
const {
  createUser,
  getAllUsers,
  getUserByUsername,
  updateUserByUsername,
  deleteUserByUsername,
} = require("./controllers"); // Import the controller functions from the controllers.js file.
const { hashPassword } = require("../middleware/auth"); // Import the auth middleware functions from middleware/auth.js.

// Variables
const userRouter = Router();

// Routes
userRouter.post("/signup", hashPassword, createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserByUsername);
userRouter.put("/:id", updateUserByUsername);
userRouter.delete("/:id", deleteUserByUsername);

// Export userRouter
module.exports = userRouter;
