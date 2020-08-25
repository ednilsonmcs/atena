'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addConstraint(
      {
        tableName: 'fonte',
        schema: 'sa'
      },
      ["hash"],
      {
        type: "unique",
        name: "hashUnico",
    })
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeConstraint({
      tableName: 'fonte',
      schema: 'sa'
    }, 'hashUnico');
  }
};