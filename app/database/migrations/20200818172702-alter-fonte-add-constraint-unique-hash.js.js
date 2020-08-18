'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addConstraint(
      "fonte",
      ["hash"],
      {
        type: "unique",
        name: "hashUnico",
    })
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeConstraint('fonte', 'hashUnico');
  }
};