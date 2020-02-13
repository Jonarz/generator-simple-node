module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('<%= modelname.toLowerCase()  %>s', {
        id:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        <% fields.forEach( field => { %>
        <%= field.fieldName %>: {
            type: DataTypes.<%= field.fieldType.toUpperCase()  %>,
            allowNull: <%= field.allowNull %>,
        },
          <% }) %>
      });
    },
    down: (queryInterface) => {
      return queryInterface.dropTable('<%= modelname.toLowerCase() %>s');
    }
  };
  