class UsersRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = ` CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)`;
        return this.dao.run(sql)
    }

    create(email, password) {
        return this.dao.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    }

    update(user) {
        const { id, email, password } = user;
        return this.dao.run(`UPDATE users SET email = ?, password = ? WHERE id = ?`, [email, password, id]);
    }

    delete(id) {
        return this.dao.run(`DELETE FROM users WHERE id = ?`,[id]);
    }

    getById(id) {
        return this.dao.get(`SELECT * FROM users WHERE id = ?`,[id]);
    }

    getByEmail(email) {
        return this.dao.get(`SELECT * FROM users WHERE email = ?`,[email]);
    }

    getAll() {
        return this.dao.all(`SELECT * FROM users`);
    }
}

module.exports = UsersRepository;