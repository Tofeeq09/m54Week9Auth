//  Importing Internal Dependencies
const User = require("./model"); // Import the User model from the model.js file. This model represents the users table in the database and can be used to run queries on this table.

// Route handler / Controller functions
// Create a new user on the POST /api/signup route
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Extract the username, email, and password from the request body. These are the user's credentials that they entered in the signup form.
    const user = await User.create({ username, email, password }); // Create a new user in the database using the User model's create method. This method inserts a new row in the users table with the provided username, email, and password. It returns a promise that resolves to the newly created user.

    const userResponse = { id: user.id, username: user.username, email: user.email }; // Create a response object that includes the new user's id, username, and email. This object will be sent back to the client in the response.
    res.status(201).json(userResponse); // Send a 201 Created status code and the userResponse object in the response. The 201 status code indicates that a new resource was successfully created.
  } catch (error) {
    res.status(500).json({ error: error.message }); // If an error occurs, send a 500 Internal Server Error status code and the error message in the response. This could be due to a problem with the User model, a problem with the request body, or a problem with the server itself.
  }
};
// Get all users on the GET /api/users route
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Use the User model's findAll method to get all users from the database. This method returns a promise that resolves to an array of all users.

    res.status(200).json(users); // Send a 200 OK status code and the array of users in the response. The 200 status code indicates that the request was successful.
  } catch (error) {
    res.status(500).json({ error: error.message }); // If an error occurs, send a 500 Internal Server Error status code and the error message in the response. This could be due to a problem with the User model, a problem with the request body, or a problem with the server itself.
  }
};
// Get a user by username on the GET /api/users/:username route
const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params; // Extract the username from the request parameters. This is the username that the client has included in the URL.
    const user = await User.findOne({ where: { username } }); // Use the User model's findOne method to get the user with the specified username from the database. This method returns a promise that resolves to the user if found, or null if not found.
    if (!user) {
      res.status(404).json({ message: `User with username ${username} not found` }); // If the user is not found (i.e., if user is null), send a 404 Not Found status code and a message in the response. The 404 status code indicates that the requested resource could not be found on the server.
      return; // End the function execution here. The following code will not be executed.
    }

    res.status(200).json(user); // If the user is found (i.e., if user is not null), send a 200 OK status code and the user in the response. The 200 status code indicates that the request was successful.
  } catch (error) {
    res.status(500).json({ error: error.message }); // If an error occurs, send a 500 Internal Server Error status code and the error message in the response. This could be due to a problem with the User model, a problem with the request parameters, or a problem with the server itself.
  }
};
// Log in a user on the POST /api/login route
const login = async (req, res) => {
  res.status(200).json({ message: "Login successful", userData: req.userData }); // Send a 200 OK status code and a success message in the response. The success message includes the username that the client sent in the request body. This is a placeholder for the actual login logic, which would involve authenticating the user's credentials and possibly generating a session or token.
};
// Update a username on the PUT /api/users/:username route
const updateUserByUsername = async (req, res) => {
  try {
    const { username } = req.params; // Extract the username from the request parameters. This is the username that the client has included in the URL.
    const [updated] = await User.update(req.body, { where: { username: username } }); // Use the User model's update method to update the user with the specified username in the database. This method returns a promise that resolves to an array. The first element of the array is the number of affected rows.
    if (!updated) {
      res.status(404).json({ message: `User with username ${username} not found` }); // If the number of affected rows is zero (i.e., if the user was not found in the database) then send a 404 Not Found status code and a message in the response. The 404 status code indicates that the requested resource could not be found on the server.
    }

    const updatedUser = await User.findOne({ where: { username: username } }); // If the number of affected rows is not zero (i.e., if the user was successfully updated) then use the User model's findOne method to get the updated user from the database. This method returns a promise that resolves to the updated user.
    res.status(200).json(updatedUser); // Send a 200 OK status code and the updated user in the response. The 200 status code indicates that the request was successful.
  } catch (error) {
    res.status(500).json({ error: error.message }); // If an error occurs, send a 500 Internal Server Error status code and the error message in the response. This could be due to a problem with the User model, a problem with the request parameters, or a problem with the server itself.
  }
};
// Delete a username on the DELETE /api/users/:username route
const deleteUserByUsername = async (req, res) => {
  try {
    const { username } = req.params; // Extract the username from the request parameters. This is the username that the client has included in the URL.
    const deleted = await User.destroy({ where: { username } }); // Use the User model's destroy method to delete the user with the specified username from the database. This method returns a promise that resolves to the number of affected rows.
    if (!deleted) {
      res.status(404).json({ message: `User with username ${username} not found` }); // If the number of affected rows is zero (i.e., if the user was not found in the database) then send a 404 Not Found status code and a message in the response. The 404 status code indicates that the requested resource could not be found on the server.
    }

    res.status(204).json("User deleted"); // If the number of affected rows is not zero (i.e., if the user was successfully deleted) then send a 204 No Content status code and a message in the response. The 204 status code indicates that the request was successful, but there's no representation to return (i.e., the response is empty).
  } catch (error) {
    res.status(500).json({ error: error.message }); // Use the User model's destroy method to delete the user with the specified username from the database. This method returns a promise that resolves to the number of affected rows.
  }
};

// Export the functions
module.exports = {
  signup,
  login,
  getAllUsers,
  getUserByUsername,
  updateUserByUsername,
  deleteUserByUsername,
}; // Export the controller functions for use in other files. These functions handle the logic for the different routes. Each function corresponds to a specific route and HTTP method, and contains the logic to handle requests to that route.
