'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addIndex({
        tableName: 'dim_endereco',
        schema: 'dw'
      },
      ['logradouro','bairro','municipio','estado','federacao'],
      {
        name: 'index_endereco'
      }
    );
  },

  down: (queryInterface) => {
     return queryInterface.removeIndex({
        tableName: 'dim_endereco',
        schema: 'dw'
      },
      'index_endereco'
    );
  }

};
