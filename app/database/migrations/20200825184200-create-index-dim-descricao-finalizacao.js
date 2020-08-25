'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addIndex({
        tableName: 'dim_descricao_finalizacao',
        schema: 'dw'
      },
      ['nome'],
      {
        name: 'index_id_finalizacao'
      }
    );
  },

  down: (queryInterface) => {
     return queryInterface.removeIndex({
        tableName: 'dim_descricao_finalizacao',
        schema: 'dw'
      },
      'index_id_finalizacao'
    );
  }

};
