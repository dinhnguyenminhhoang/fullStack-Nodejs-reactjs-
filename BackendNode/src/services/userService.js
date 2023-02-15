import db from "../models";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
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
let createNewUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({ errcode: 1, message: "email đã được sử dụng" });
      }
      let hasPassWordFromBcr = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        passWord: hasPassWordFromBcr,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        positionId: data.position,
      });
      resolve({ errcode: 0, message: "OK" });
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassWord = await bcrypt.hashSync(password, salt);
      resolve(hashPassWord);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin,
  checkUserEmail,
  getAllUsers,
  createNewUser,
  hashUserPassword,
};
