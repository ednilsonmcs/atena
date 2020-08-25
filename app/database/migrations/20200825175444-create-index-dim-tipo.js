'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addIndex({
        tableName: 'dim_tipo',
        schema: 'dw'
      },
      ['nome'],
      {
        name: 'index_nome'
      }
    );
  },

  down: (queryInterface) => {
     return queryInterface.removeIndex({
        tableName: 'dim_tipo',
        schema: 'dw'
      },
      'index_nome'
    );
  }

};
