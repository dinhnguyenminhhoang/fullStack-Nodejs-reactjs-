"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@gmail.com",
        passWord: "12345",
        firstName: "Minh",
        lastName: "Hoang",
        address: "Binh Phuoc",
        phoneNumber: "0337972340",
        gender: "1",
        image: "hjksdf",
        roleId: "R1",
        positionId: "CEO",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
