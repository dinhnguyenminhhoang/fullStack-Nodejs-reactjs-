import bcrypt from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);
let creatNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve("ok");
    } catch (error) {
      reject(error);
    }
  });
};
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
let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll();
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let getUserInfoById = (userId) => {
  if (userId) {
    return new Promise(async (resolve, reject) => {
      try {
        let users = await db.User.findOne({
          where: { id: userId },
          raw: true,
        });
        if (users) {
          resolve(users);
        } else {
          resolve({});
        }
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  }
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: data.id } });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: id } });
      if (user) {
        user.destroy();
      }
      let allUser = await db.User.findAll();
      resolve(allUser);
      // resolve();
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  creatNewUser,
  hashUserpassWord,
  getAllUsers,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
