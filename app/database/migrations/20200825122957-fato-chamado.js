'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('fato_chamado', { 
        id: {
          allowNull: false,
          autoIncremente: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        descricao_id: {
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'junk_descricao',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER
        },
        tempo_id: {
          allowNull: false,
          references: {
            model: 'dim_tempo',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER
        },
        endereco_id: {
          allowNull: false,
          references: {
            model: 'dim_endereco',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER
        },
        finalizacao_id: {
          allowNull: false,
          references: {
            model: 'dim_descricao_finalizacao',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER
        }
         
      });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('fato_chamado');
  }
};
