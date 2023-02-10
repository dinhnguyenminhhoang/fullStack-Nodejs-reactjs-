import { request } from "http";
import CRUDService from "../services/CRUDServie";
import db from "../models/index";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let messae = await CRUDService.creatNewUser(req.body);
  console.log(messae);
  return res.send("post crud view");
};
let displayCROD = async (req, res) => {
  let data = await CRUDService.getAllUsers({ raw: true });
  return res.render("displayCROD.ejs", {
    data,
  });
};
let editCROD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    return res.render("editCRUD.ejs", {
      userData,
    });
  } else {
    return res.render("editCRUD.ejs");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  let allUser = await CRUDService.updateUserData(data);
  return res.render("displayCROD.ejs", {
    data: allUser,
  });
};
let deleteCRUD = async (req, res) => {
  let data = req.body;
  let id = req.query.id;
  if (id) {
    let allUser = await CRUDService.deleteUserById(id);
    return res.render("displayCROD.ejs", {
      data: allUser,
    });
  }
};
module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  displayCROD,
  editCROD,
  putCRUD,
  deleteCRUD,
};
