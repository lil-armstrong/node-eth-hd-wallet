"use strict";
const { Model } = require("sequelize");
const { createWallet } = require("../../helpers");

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User } = models;
      // User
      User.hasMany(Wallet);
    }
  }
  Wallet.init(
    {
      address: DataTypes.STRING,
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      asset_type: {
        type: DataTypes.UUID,
        set(value) {
          this.setDataValue(createWallet(this.password))
        }
      },
      balance: DataTypes.DOUBLE,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Wallet",
      underscored: true,
      tableName: "tbl_wallets",
      
    }
  );
  return Wallet;
};
