'use strict';

const { on } = require("nodemon");

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('dim_termo', { 
        id:{
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        termo: {
          allowNull: false,
          type: Sequelize.STRING(40)
        },
        termo_stem: {
          allowNull: false,
          type: Sequelize.STRING(30)
        },
        tipo_id:{
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'dim_tipo',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }  
      });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('dim_termo');
  }
};
