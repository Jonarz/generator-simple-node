module.exports = {
  development: {
    database: "dev_db",
    username: "db_user",
    password: null,
    dialect: "sqlite",
    storage: ":memory",
    dialectOption: {
      ssl: true,
      native: true
    }
  },

  test: {
    database: "test_db",
    username: "test_user",
    password: null,
    dialect: "sqlite",
    storage: ":memory",
    dialectOption: {
      ssl: true,
      native: true
    }
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
};
