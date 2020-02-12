module.exports = {

  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: 'dev_db',
    username: 'postgres',
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    database: 'test_db',
    username: 'postgres',
    password: null,
    host: 'localhost',
    dialect: 'postgres'
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};
