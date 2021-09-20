"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Order, Advert } = models;
      Order.belongsTo(Advert);
      Advert.hasOne(Order);
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => {
          return `ORD-${Date.now.toString()}`;
        },
      },
      advert_id: DataTypes.UUID,
      total_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },
      total_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      from_user_id: DataTypes.UUID,
      appeal: DataTypes.STRING,
      remark: DataTypes.STRING,
      status: {
        type:  DataTypes.ENUM(
          "unpaid",
          "paid",
          "released",
          "completed",
          "disputed",
          "canceled"
        ),
        defaultValue: 'unpaid'
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 1,
          max: 5,
        },
        allowNull: true,
      },
      archived_at: DataTypes.DATE,
      trx_id: DataTypes.STRING,
      profile: {
        type: DataTypes.VIRTUAL,
        get() {
          return {
           
          };
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
      underscored: true,
      tableName: "tbl_orders",
    }
  );
  return Order;
};
