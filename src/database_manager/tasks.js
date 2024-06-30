import DatabaseConnector from '../db_connection.js';
const databaseConnector = new DatabaseConnector();

class TasksManager {

    constructor() {
        this.DBPool = databaseConnector.createDBPool();
    }

    checkDBPool() {
        if (this.DBPool.state === 'disconnected') {
            this.DBPool = databaseConnector.createDBPool();
        }
    }

    createTasksTable() {
        const createTasksTable = `
            CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            description VARCHAR(255) NOT NULL,
            status ENUM('not_completed', 'completed') NOT NULL DEFAULT 'not_completed',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )`;

        this.DBPool.query(createTasksTable, (err, results) => {
            if (err) {
              console.error('Error creating tasks table:', err.stack);
              return;
            }
        })
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
            this.createTasksTable();
            this.DBPool.query(
                query,
                [...params],
                async (err, result) => {
                    return err ? reject(err) : resolve(result);
                }
            );
        });
    }
    
    getTasks(userId) {
        const query = `SELECT * FROM tasks WHERE userId = ?`;
        return this.queryBuilder(query, userId);
    }

    createTask(userId, description, status) {
        const query = `INSERT INTO tasks (userId, description) VALUES (?, ?)`;
        return this.queryBuilder(query, userId, description);
    }

    getTaskById(id, userId) {
        const query = `SELECT * FROM tasks WHERE id = ? AND userId = ?`;
        return this.queryBuilder(query, id, userId);
    }

    updateTask(id, description, userId) {
        const query = `UPDATE tasks SET description = ? WHERE id = ? AND userId = ?`;
        return this.queryBuilder(query, description, id, userId);
    }

    updateTaskStatus(id, status, userId) {
        const query = `UPDATE tasks SET status = ? WHERE id = ? AND userId = ?`;
        return this.queryBuilder(query, status, id, userId);
    }

    deleteTask(id, userId) {
        const query = `DELETE FROM tasks WHERE id = ? AND userId = ?`;
        return this.queryBuilder(query, id, userId);
    }
}

export default TasksManager;