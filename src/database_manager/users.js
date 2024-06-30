import DatabaseConnector from '../db_connection.js';
const databaseConnector = new DatabaseConnector();

class UsersManager {

    constructor() {
        this.DBPool = databaseConnector.createDBPool();
    }

    checkDBPool() {
        if (this.DBPool.state === 'disconnected') {
            this.DBPool = databaseConnector.createDBPool();
        }
    }

    createUsersTable() {
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`;

        this.DBPool.query(createUsersTable, (err, results) => {
            if (err) {
              console.error('Error creating users table:', err.stack);
              return;
            }
        })
    }

    queryBuilder(query, ...params) {
        return new Promise((resolve, reject) => {
            this.checkDBPool();
            this.createUsersTable();
            this.DBPool.query(
                query,
                [...params],
                async (err, result) => {
                    return err ? reject(err) : resolve(result);
                }
            );
        });
    }

    findByEmail(email) {
        const query = `SELECT * FROM users WHERE email = ?`;
        return this.queryBuilder(query, email);
    }

    findById(id) {
        const query = `SELECT * FROM users WHERE id = ?`;
        return this.queryBuilder(query, id);
    }

    createUser(firstName, lastName, email, password) {
        const query = `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;
        return this.queryBuilder(query, firstName, lastName, email, password);
    }
}

export default UsersManager;