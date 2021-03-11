'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [{
      name: 'Samsung Galaxy',
      slug: 'galaxy',
      sku: 'sam-glxy',
      brandId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Samsung Note',
      slug: 'note',
      sku: 'sam-note',
      brandId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'LG Smart TV',
      slug: 'tv',
      sku: 'smart-tv',
      brandId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};