import mysql from 'mysql2';

class DatabaseConnector {

  createDBPool() {
      const mysqlPool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_NAME
      });

      return mysqlPool;
  }

}

export default DatabaseConnector;