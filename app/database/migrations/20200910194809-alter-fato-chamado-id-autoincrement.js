"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn({
			tableName: "fonte_chamado",
			schema: "dw"
		},"id",{
			au: false
		});
	},

	down: (queryInterface) => {
		return queryInterface.changeColumn({
			tableName: "fonte_chamado",
			schema: "dw"
		}, "id");
	}
};
