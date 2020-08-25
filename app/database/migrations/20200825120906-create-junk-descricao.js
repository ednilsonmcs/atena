'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('junk_descricao', { 
       id: {
          primaryKey:true,
          autoIncrement: true,
          allowNull: false,
          type: Sequelize.INTEGER
       },
       descricao_chamado: {
         allowNull: false,
         type: Sequelize.TEXT('long')
       }
      },
      {
        schema: 'dw'
      });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('junk_descricao');
  }
};
