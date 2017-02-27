/**
 * Created by panktibhalani on 2/25/17.
 */

module.exports = function (app) {
    app.post("/api/user",createUser);
    //app.get("/api/user",findUserByUsername);
    app.get("/api/user",findUserByCredentials);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);



    var users = [
        {_id: "123", email:"abc@gmail.com", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", email:"abc@gmail.com", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", email:"abc@gmail.com", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", email:"abc@gmail.com", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser1 = req.body;
        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {

                users[u].username = newUser1.username;
                users[u].firstName = newUser1.firstName;
                users[u].lastName = newUser1.lastName;
                users[u].email = newUser1.email;
                res.sendStatus(200);
                return true;
            }
        }
        res.sendStatus(404);
    }

    function deleteUser(req,res) {



        var uid = req.params['userId'];
        console.log(uid);
        for(var u in users) {
            var user = users[u];
            if( user._id === uid) {
                var index = users.indexOf(user);
                users.splice(index,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findUserByUsername(req,res) {

        var newParams = req.query;

        var username = newParams['username'];

        for(var u in users) {
            var user = users[u];
            if( user.username === username ) {
                res.send(user)
                return;

            }
        }
        res.sendStatus(404).send('User not found for username:' + username);

    }

    function findUserById(req,res) {

        uid = req.params['userId'];

        console.log(uid);
        for(var u in users) {
            var user = users[u];
            if( user._id === uid ) {
                res.send(user)
                return;
            }
        }

    }

    function createUser(req,res) {


        var newUser = req.body;

        var today = new Date();
        var time = today.getDate() + today.getFullYear() + today.getMonth() + today.getHours() + today.getMinutes() + today.getSeconds();

        time = time.toString();

        if(newUser.password === newUser.verifypassword) {
            var userNew =
                {
                    _id: time,
                    username: newUser.username,
                    password: newUser.password,
                    firstName: "",
                    email: "",
                    lastName: ""
                };
            users.push(userNew);
            console.log(userNew)
            res.json(userNew);
            return true;
        }


    }

    function findUserByCredentials(req,res) {

        var newParams = req.query;
        var username = newParams['username'];
        var password = newParams['password'];



        for(var u in users) {
            var user = users[u];
            if( user.username === username &&
                user.password === password) {
                console.log("got it")
                res.send(user);
                return true;
            }
        }
        res.sendStatus(404).send('User was not found for username:' + username);

    }
};



