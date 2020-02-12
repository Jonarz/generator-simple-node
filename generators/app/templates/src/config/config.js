module.exports = {

  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: 'books',
    username: 'postgres',
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  },

  test: {
    database: 'book_test',
    username: 'postgres',
    password: null,
    host: 'localhost',
    dialect: 'postgres',
    define: {
      timestamps: true
   }
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};
