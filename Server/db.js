const { Pool } = require('pg');

exports.pool = new Pool ({
  user: 'MassimoBergamin',
  host: 'localhost',
  database: 'RemoteTrainer',
  port: 5432
});