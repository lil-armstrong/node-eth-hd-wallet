"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class P2PTradeFee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  P2PTradeFee.init(
    {
      fiat_currency: DataTypes.STRING,
      asset_type: DataTypes.INTEGER,
      rate: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "P2PTradeFee",
      underscored: true,
      tableName: "tbl_p2p_trade_fees",
    }
  );

  return P2PTradeFee;
};
