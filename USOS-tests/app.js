/**
 * Propozycja działania aplikacji ;)
 *
 * Do działania aplikacji:
 * - przed pierwszym uruchomieniem: npm install
 * - w pliku authorization.js trzeba wpisac klucze
 * - odpalanie aplikacji: node app.js
 * - w przeglądarce: localhost:3000
 *
 *
 *
 * Do zrobienia:
 * -połączenie pokoju z skryptem szukajacym go na mapie
 * -dodanie wyszukiwarki sal
 * -po kliknieciu przycisku wiecej powinna odpalac sie sciezka /details 'przyjmujaca' imie i nazwisko.
 */

const express = require('express');
const userInfo = require('./userInfo');
const fs = require('fs');


var app = express();
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    var users = JSON.parse(fs.readFileSync('people.json'));
    res.render('index.hbs', {
        users
    });
})

app.get('/details/:name', (req, res) => {
    var name = req.params.name;
    userInfo.getUserID(name, (id) => {
        var employList = fs.readFileSync('./people.json');
        employList = JSON.parse(employList);
        var szukany = employList.filter(user => user.Name.includes(name));

        if (id !== "") {
            userInfo.getStaffActivities(id, (body) => {
                var activities = JSON.parse(body);
                res.render('details.hbs', {
                    name: szukany[0].Name,
                    room: szukany[0].Room,
                    title: szukany[0].title,
                    activities
                });
            })
        }
    })
})

app.get('/room/:number', (req, res) => {
    var room = req.params.number;
    res.render('room.hbs');
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})
