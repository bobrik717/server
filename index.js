const express = require('express');
const url = require('url');
const Promise = require('bluebird');
const AppDAO = require('./dao');
const usersRepository = require('./users_repository');
const User = require('./user');

const app = express();
const port = 3000;

app.get('/', (request, response) => {
    main().then(res => {
        response.send(res);
    });
});

app.get('/login', (request, response) => {
    let queryData = url.parse(request.url, true).query;
    (new User(queryData)).login().then(res => {
        response.send(res)
    });
});

app.get('/register', (request, response) => {
    let queryData = url.parse(request.url, true).query;
    let res = (new User(queryData)).register().then(res => {
        response.send(res)
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`);
});

function main() {
    return new Promise((resolve, reject) => {
        const dao = new AppDAO('./database.sqlite3');
        const usersRepo = new usersRepository(dao);
        let res = null;
        usersRepo.getAll()
            .then( data => {
                if (!data) reject(err);
                else resolve(data);
            });
    });
}