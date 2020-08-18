'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('itensfonte','fonte_id',{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'fonte', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('itensfonte', 'fonte_id')
  }
};
