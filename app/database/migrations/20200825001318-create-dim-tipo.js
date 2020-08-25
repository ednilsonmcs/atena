'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('dim_tipo', { 
       id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
       },
       nome: {
          allowNull: false,
          type: Sequelize.STRING(30)
       },
       marca: {
          allowNull: true,
          type: Sequelize.STRING(30)
       },
       tipo: {
          allowNull: false,
          type: Sequelize.INTEGER
       },
       descricao: {
        allowNull: false,
        type: Sequelize.STRING(30)
     },
   },
	{
	  schema: 'dw'
    });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('dim_tipo');
  }
};
