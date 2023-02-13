import db from "../models";
import bcrypt from "bcryptjs";
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExits = await checkUserEmail(email);
      if (isExits) {
        //compare password
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "passWord"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.passWord);
          if (check) {
            userData.errcode = 0;
            userData.errMessage = "OK";
            delete user.passWord;
            userData.user = user;
          } else {
            userData.errcode = 3;
            userData.errMessage = "wrong password";
          }
        } else {
          userData.errcode = 2;
          userData.errMessage = "user khon ton tai";
        }
      } else {
        //return err
        userData.errcode = 1;
        userData.errMessage = "email khon ton tai";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: userEmail } });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUsers = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (id === "ALL") {
        users = await db.User.findAll({
          attributes: { exclude: ["passWord"] },
        });
      }
      if (id && id !== "ALL") {
        users = await db.User.findOne({
          where: { id: id },
          attributes: { exclude: ["passWord"] },
        });
      }
      console.log(users);
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin,
  checkUserEmail,
  getAllUsers,
};
