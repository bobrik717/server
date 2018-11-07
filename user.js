const Promise = require('bluebird');
const AppDAO = require('./dao');
const usersRepository = require('./users_repository');

class User {
    constructor(req) {
        const dao = new AppDAO('./database.sqlite3');
        this.usersRepo = new usersRepository(dao);
        this.email = req.email.trim();
        this.password = req.password.trim();
    }

    login() {
        return new Promise((resolve, reject) => {
            if (this.validateReq()) {
                this.usersRepo.getByEmail(this.email).then(res => {
                    if (res && res.password === this.password) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            }
        });
    }

    register() {
        return new Promise((resolve, reject) => {
            if (this.validateReq()) {
                this.usersRepo.createTable()
                    .then(() => this.usersRepo.create(this.email, this.password))
                    .then((data) => {
                        if (data && data.id) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    })
            }
        });
    }

    validateReq() {
        return !(!this.email || !this.password);
    }
}

module.exports = User;