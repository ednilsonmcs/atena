'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addIndex({
        tableName: 'dim_termo',
        schema: 'dw'
      },
      ['termo'],
      {
        name: 'index_termo'
      }
    );
  },

  down: (queryInterface) => {
     return queryInterface.removeIndex({
        tableName: 'dim_termo',
        schema: 'dw'
      },
      'index_termo'
    );
  }

};
