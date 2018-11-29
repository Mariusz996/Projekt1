const express = require('express');
const userInfo = require('./userInfo');
const fs = require('fs');


var app = express();
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    var users = JSON.parse(fs.readFileSync('jsonFile.json'));
    res.render('index.hbs',{
        users
    });
})


app.get('/details', (req, res) => {
    var name = req.query.name;

    userInfo.getUserID(name, (id) => {
        var employList = fs.readFileSync('./jsonFile.json');
        employList = JSON.parse(employList);
        var szukany;
        employList.forEach(item => {
            if (item.Name === name || item.Surname === name)
                szukany = item;
        });

        if (id !== "") {
            userInfo.getStaffActivities(id, (body) => {
                // console.log(szukany);
                var activities = JSON.parse(body);
                res.render('getinfo.hbs', {
                    name: szukany.Name,
                    surname: szukany.Surname,
                    room: szukany.Room,
                    activities
                });
            })
        }
    });
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})
