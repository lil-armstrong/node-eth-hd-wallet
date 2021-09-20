"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Escrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Escrow, Order } = models;

      Order.hasOne(Escrow, {
        foreignKey: {
          name: 'order_id'
        }
      })

    }
  }
  Escrow.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      order_id: DataTypes.STRING,
      fiat_amount_in_hold: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },
      seller_id: DataTypes.UUID,
      buyer_id: DataTypes.UUID,
      fee: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Escrow",
      underscored: true,
      tableName: "tbl_escrows",
    }
  );

  return Escrow;
};
