"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tbl_users",
      [
        {
          id: '9fb01de0-1d63-4d09-9415-90e0b4e93b9a',
          email: "email@mail.com",
          password: "$2a$10$TuGJijoSAfLgHTneVCPQm.3XRYqoGEIQhLxwbIuFyvc13MGe6/YwK",
          referral_code: 'seet7pcH'
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("tbl_users", null, {});
  },
};
