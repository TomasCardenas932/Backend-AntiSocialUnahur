require('dotenv').config();

// Unica configuracion de la base: la usan la app (models/index.js) y sequelize-cli (.sequelizerc).
// Para cambiar de motor alcanza con modificar el .env e instalar el driver (sqlite3, mysql2, pg...).
const config = {
    dialect: process.env.DB_DIALECT || 'sqlite',
    // solo para sqlite
    storage: process.env.DB_STORAGE || './src/data/antiSocialNet.db',
    // solo para motores con servidor (mysql, postgres, etc.)
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: process.env.DB_LOGGING === 'true' ? console.log : false
};

module.exports = {
    development: config,
    test: config,
    production: config
};
