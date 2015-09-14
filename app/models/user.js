'use strict';

var ssaclAttributeRoles = require('ssacl-attribute-roles');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('users', {
    /*
     * Set the table fields that you want for your model
     * Example:
     * username: DataTypes.STRING
     *
     * The "id", "created_at" and "updated_at" fields are automatically added >
     * > unless anything else is specified
     */
     username: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true
     },
     about_me: DataTypes.TEXT,
     hash: {
       type: DataTypes.STRING,
       roles: {
         admin: true
       }
     }
  }, {
    getterMethods: {
      /*
       * Set pseudo properties
       * These will not be stored in the table, but rendered in the JSON response
       * Example:
       * username_uppercased: function() { return this.getDataValue('username').toUpperCase(); }
       */
    },

    classMethods: {
      associate: function(models) {
        /*
         * Define relationships with other models
         * Example:
         * models.user.hasOne(models.project);
         */
         models.user.hasMany(models.chirp, {
           foreignKey: {
             as: 'user_id',
             allowNull: false
           }
         });

         models.user.belongsToMany(models.user, {
           as: 'followees',
           through: models.follow,
           foreignKey: 'follower_id',
           otherKey: 'followee_id'
         });

         models.user.belongsToMany(models.user, {
           as: 'followers',
           through: models.follow,
           foreignKey: 'followee_id',
           otherKey: 'follower_id'
         });
      }
    },

    underscored: true,
    underscoredAll: true,
    createdAt: 'joined_at'

    /* Find more configurations at:
     * http://docs.sequelizejs.com/en/latest/docs/models-definition/#configuration
     */
  });

  ssaclAttributeRoles(User);

  return User;
};
