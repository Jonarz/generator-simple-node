module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id:{
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false
      },
      
      username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },

      token: {
        type: DataTypes.STRING,
        allowNull: true
      },
        
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
        
    },{
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: true,
      // don't delete database entries but set the newly added attribute deletedAt
      // to the current date (when deletion was done). paranoid will only work if
      // timestamps are enabled
      paranoid: true,
      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: true,
      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,
      // define the table's name
      tableName: 'users'
    });
  
    User.associate = function (models) {}
  
  
    return User;
  };
  