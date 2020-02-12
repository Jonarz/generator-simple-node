module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('users', {
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

        created_at:{
          type: DataTypes.DATE,
          allowNull: false,
        },

        updated_at:{
          type: DataTypes.DATE,
          allowNull: true,
        },

        deleted_at:{
          type: DataTypes.DATE,
          allowNull: true,
        }
          
      });
    },
    down: (queryInterface) => {
      return queryInterface.dropTable('users');
    }
  };
  