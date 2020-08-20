"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable("dim_tempo", { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        data: {
          allowNull: false, 
          type: Sequelize.DATEONLY
        },
        hora: {
          allowNull: false, 
          type: Sequelize.TIME
        },
        turno: {
          allowNull: false, 
          type: Sequelize.STRING(10)
        },
        mes: {
          allowNull: false, 
          type: Sequelize.INTEGER
        },
        ano: {
          allowNull: false, 
          type: Sequelize.INTEGER
        },
        dia_semana: {
          allowNull: false, 
          type: Sequelize.INTEGER
        },
        dia: {
          allowNull: false, 
          type: Sequelize.INTEGER
        },
        ano_bissexto: {
          allowNull: false, 
          type: Sequelize.BOOLEAN
        },
        dia_util: {
          allowNull: false, 
          type: Sequelize.BOOLEAN
        },
        fim_semana: {
          allowNull: false, 
          type: Sequelize.BOOLEAN
        },
        feriado: {
          allowNull: false, 
          type: Sequelize.BOOLEAN
        },
        pos_feriado: {
          allowNull: false, 
          type: Sequelize.BOOLEAN
        },
        pre_feriado: {
          allowNull: false, 
          type: Sequelize.BOOLEAN
        },
        nome_dia_semana: {
          allowNull: false, 
          type: Sequelize.STRING(14)
        },
        nome_feriado: {
          allowNull: false, 
          type: Sequelize.STRING(30)
        },
        quinzena: {
          allowNull: false, 
          type: Sequelize.INTEGER
        },
        nome_mes: {
          allowNull: false, 
          type: Sequelize.STRING(10)
        },
        bimestre: {
          allowNull: false, 
          type: Sequelize.INTEGER
        },
        trimestre: {
          allowNull: false, 
          type: Sequelize.INTEGER
        },
        semestre: {
          allowNull: false, 
          type: Sequelize.INTEGER
        }
      });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable("dim_tempo");
  }
};
