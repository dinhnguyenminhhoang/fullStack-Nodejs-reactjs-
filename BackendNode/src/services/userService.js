import db from "../models";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let hashUserpassWord = (passWord) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashpassWord = await bcrypt.hashSync(passWord, salt);
      resolve(hashpassWord);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserLogin = (email, passWord) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExits = await checkUserEmail(email);
      if (isExits) {
        //compare passWord
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "passWord"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(passWord, user.passWord);
          if (check) {
            userData.errcode = 0;
            userData.errMessage = "OK";
            delete user.passWord;
            userData.user = user;
          } else {
            userData.errcode = 3;
            userData.errMessage = "wrong passWord";
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
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({ errcode: 1, message: "email đã được sử dụng" });
      } else {
        let haspassWordFromBcr = await hashUserpassWord(data.passWord);
        await db.User.create({
          email: data.email,
          passWord: haspassWordFromBcr,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
          positionId: data.position,
        });
        resolve({ errcode: 0, message: "OK" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({ errcode: 2, errMessage: "missing required parmeter" });
      }
      let foundUser = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (!foundUser) {
        resolve({ errcode: 2, errMessage: "the user not found!" });
      }
      if (foundUser) {
        foundUser.firstName = data.firstName;
        foundUser.lastName = data.lastName;
        foundUser.address = data.address;
        await foundUser.save();
        resolve({ errcode: 0, message: "update user successfully" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.User.findOne({ where: { id: userId } });
      if (!foundUser) {
        resolve({ errcode: 2, errMessage: "the user not found!" });
      }
      // if (foundUser) {
      //   await foundUser.distroy();
      // }
      await db.User.destroy({ where: { id: userId } });
      resolve({ errcode: 0, message: "delete account succsessful" });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin,
  checkUserEmail,
  getAllUsers,
  createNewUser,
  hashUserpassWord,
  editUser,
  deleteUser,
};
