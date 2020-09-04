"use strict";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.addIndex({
        tableName: "dim_tempo",
        schema: "dw"
      },
      ["data","hora"],
      {
        name: "index_tempo"
      }
    );
  },

  down: (queryInterface) => {
     return queryInterface.removeIndex({
        tableName: "dim_tempo",
        schema: "dw"
      },
      "index_tempo"
    );
  }

};
