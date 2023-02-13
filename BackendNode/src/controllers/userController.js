import userService from "../services/userService";

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errcode: 1,
      message: "Please provide email and password",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    userData,
  });
};
const handlGetAllUsers = async (req, res) => {
  let type = req.query.id; // All or single
  let users = await userService.getAllUsers(type);
  return res.status(200).json({
    users,
    errcode: 0,
    errMessage: "OK",
  });
};
const handleCreateNewUser = async (req, res) => {
  
};
module.exports = {
  handleLogin,
  handlGetAllUsers,
  handleCreateNewUser,
};
