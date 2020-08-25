'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('dim_endereco', { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
       logradouro: {
        allowNull:false, 
        type:Sequelize.STRING(100)
       },
       bairro: {
        allowNull:false, 
        type:Sequelize.STRING(50)
       },
       municipio: {
        allowNull:false, 
        type:Sequelize.STRING(50)
       },
       estado: {
        allowNull:false, 
        type:Sequelize.STRING(40)
       },
       federacao: {
        allowNull:false, 
        type:Sequelize.STRING(40)
       },
      },
      {
        schema: 'dw'
      });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('dim_endereco');
  }
};
