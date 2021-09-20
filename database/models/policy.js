"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Policy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Policy.init(
    {
      escrow_fee: DataTypes.DOUBLE,
      maker_ad_fee: DataTypes.DOUBLE,
      taker_ad_fee: DataTypes.DOUBLE,
      min_confirmation_block: {
        type: DataTypes.INTEGER 
      }
    },
    {
      sequelize,
      modelName: "Policy",
      underscored: true,
      tableName: "tbl_policies",
    }
  );

  return Policy;
};
