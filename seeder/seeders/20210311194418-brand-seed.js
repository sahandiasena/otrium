'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('brands', [{
      id: 1,
      name: 'Sony',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Samsung',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: 'LG',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('brands', null, {});
  }
};
