"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn({
			tableName: "itensfonte",
			schema: "sa"
		},"estado",{
			type: Sequelize.STRING(40),
			allowNull: false
		});
	},

	down: (queryInterface) => {
		return queryInterface.removeColumn({
			tableName: "itensfonte",
			schema: "sa"
		}, "estado");
	}
};
