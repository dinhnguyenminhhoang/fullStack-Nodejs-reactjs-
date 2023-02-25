import userService from "../services/userService";

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let passWord = req.body.passWord;
  if (!email || !passWord) {
    return res.status(500).json({
      errcode: 1,
      message: "Please provide email and passWord",
    });
  }
  let userData = await userService.handleUserLogin(email, passWord);
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
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};
const handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.editUser(data);
  return res.status(200).json(message);
};
const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json(message);
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};
module.exports = {
  handleLogin,
  handlGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
};
