"use strict";
const { Model } = require("sequelize");
const { encrypt, generateReferralCode } = require("../../helpers");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
        set: async (value) => {
          this.setDataValue("password", await encrypt(value));
        },
      },
      mode: {
        type: DataTypes.ENUM,
        values: ["standard"],
      },
      nickname: DataTypes.STRING,
      kyc: {
        defaultValue: {
          email: null,
          phone: null,
          id: null,
          payment_methods: null
        },
        type: DataTypes.JSON,
      },
      role: {
        type: DataTypes.ENUM(["standard", "admin"]),
        defaultValue: "standard",
      },
      referral_code: {
        type: DataTypes.STRING,
      },
      referrerId: {
        type: DataTypes.INTEGER,
      },
      otp: {
        type: DataTypes.STRING,
      },
      otp_ttl: DataTypes.DATE,
      last_login: DataTypes.DATE,
      verify_token: DataTypes.STRING,
      verify_token_ttl: { type: DataTypes.DATE },
      archived_at: DataTypes.DATE,
      
      profile: {
        type: DataTypes.VIRTUAL,
        get() {
          return {
            id: this.id,
            nickname: this.nickname,
            role: this.role,
            phone: this.phone_number,
            ref_code: this.referral_code,
            last_login: this.last_login,
            kyc: this.kyc,
            email: this.email,
          };
        },
      },
     
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
      tableName: "tbl_users",
      timestamps: false,
      paranoid: true,
      deletedAt: 'archived_at',
      hooks: {
        beforeCreate: (user, options) => {
          user.referral_code = generateReferralCode(user.email);
        },
      },
    }
  );

  return User;
};
