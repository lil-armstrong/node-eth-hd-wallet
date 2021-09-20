"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Advert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { User, Advert, Asset } = models;

      User.hasMany(Advert, {
        foreignKey: { name: "from_user_id", allowNull: false },
      });
      
      Advert.belongsTo(Asset, {
        foreignKey: "asset_type",
      });
    }

  }
  Advert.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      from_user_id: DataTypes.UUID,
      min_order_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },
      max_order_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },
      min_order_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },
      max_order_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          isInt: true,
        },
      },
      payment_methods: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      advert_type: {
        type: DataTypes.ENUM,
        values: ["maker", "taker"],
        allowNull: false,
        validate: {
          contains: ["maker", "taker"],
        },
      },
      payment_time_limit: {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        validate: {
          isInt: true,
        },
      },
      price: {
        validate: {
          notEmpty: true,
        },
        type: DataTypes.DOUBLE,
      },
      floating_price: DataTypes.DOUBLE,
      asset_quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          isInt: true,
        },
      },
      fiat_currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      asset_type: DataTypes.INTEGER,
      remarks: DataTypes.STRING,
      auto_reply: DataTypes.STRING,
      trade_conditions: DataTypes.STRING,
      published: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      archived_at: DataTypes.DATE,
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
      modelName: "Advert",
      underscored: true,
      tableName: 'tbl_adverts'
    }
  );
  return Advert;
};
