'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ username, email, password, firstName, lastName, previewImage }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName,
        previewImage
      });
      console.log('hit this')
      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
      // User.hasMany(models.Song, { sourceKey: 'id', foreignKey: 'userId' })
      // User.hasMany(models.Album, { sourceKey: 'id', foreignKey: 'userId' })
      // User.hasMany(models.Comment, { sourceKey: 'id', foreignKey: 'userId' })
      User.hasMany(models.Song, { foreignKey: 'userId' })
      User.hasMany(models.Album, { foreignKey: 'userId' })
      User.hasMany(models.Comment, { foreignKey: 'userId' })

    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30]
        }
      },
      previewImage: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [1, 256]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};

// 'use strict';
// const { Model, Validator } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     static associate(models) {
//       // define association here
//     }
//   };

//   User.init(
//     {
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [4, 30],
//           isNotEmail(value) {
//             if (Validator.isEmail(value)) {
//               throw new Error("Cannot be an email.");
//             }
//           }
//         }
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [3, 256]
//         }
//       },
//       hashedPassword: {
//         type: DataTypes.STRING.BINARY,
//         allowNull: false,
//         validate: {
//           len: [60, 60]
//         }
//       }
//     }
//   );
//   return User;
// };

// // 'use strict';
// // const {
// //   Model
// // } = require('sequelize');
// // module.exports = (sequelize, DataTypes) => {
// //   class User extends Model {
// //     /**
// //      * Helper method for defining associations.
// //      * This method is not a part of Sequelize lifecycle.
// //      * The `models/index` file will call this method automatically.
// //      */
// //     static associate(models) {
// //       // define association here
// //     }
// //   }
// //   User.init({
// //     username: DataTypes.STRING,
// //     email: DataTypes.STRING,
// //     hashedPassword: DataTypes.STRING
// //   }, {
// //     sequelize,
// //     modelName: 'User',
// //   });
// //   return User;
// // };
