'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Referral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User, Referral } = models;
      User.belongsToMany(User, {
        through: Referral,
        as: "referrer",
        onDelete: "CASCADE",
      });
    }
  };
  Referral.init({
   
  }, {
    sequelize,
    modelName: 'Referral',
    underscored: true,
    tableName: 'tbl_referrals'
  });
  return Referral;
};