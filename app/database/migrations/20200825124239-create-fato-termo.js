'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('fato_termo', { 
       termo_id: {
          primaryKey: true,
          references: {
            model: 'dim_termo',
            key: 'id'           
          }, 
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER 
       },
       fato_id: {
          primaryKey: true,
          references: {
            model: 'fato_chamado',
            key: 'id'           
          }, 
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER 
       },
       descricao_id: {
          primaryKey: true,
          references: {
            model: 'fato_chamado',
            key: 'id'           
          }, 
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER 
       },
      });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('fato_termo');
  }
};
