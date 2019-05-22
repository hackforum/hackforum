'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
          {
            firstName: "Dedy",
            lastName: "Simamora",
            username: "dedysimamora",
            email: "dedysimamoa627@gmail.com",
            password: "asdasd123",
            avatar: "Asdasdasd",
            status: false,
            token: "123512asdasdt",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            firstName: "Mikel",
            lastName: "Gunawan",
            username: "mikelgunawan",
            email: "mikelgunawan@gmail.com",
            password: "asdasd123",
            avatar: "Asdasdasd",
            status: false,
            token: "123512asdasdt",
            createdAt: new Date(),
            updatedAt: new Date()
          }
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};



