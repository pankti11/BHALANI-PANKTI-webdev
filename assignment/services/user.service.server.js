/**
 * Created by panktibhalani on 2/25/17.
 */

module.exports = function (app,model) {
    app.post("/api/user",createUser);
    //app.get("/api/user",findUserByUsername);
    app.get("/api/user",findUserByCredentials);
    app.get("/api/user/:userId",findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    var userModel = model.userModel;

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser1 = req.body;

        userModel
            .updateUser(userId,newUser1)
            .then(function () {
                res.sendStatus(200);
                return true;
            },function () {
            res.sendStatus(404);
        });

    }

    function deleteUser(req,res) {

        var uid = req.params['userId'];
        userModel
            .deleteUser(uid)
            .then(function () {
                res.sendStatus(200);
                return true;
            },function () {

                res.sendStatus(404);
            });

    }

    function findUserByUsername(req,res) {

        var newParams = req.query;

        var username = newParams['username'];

        userModel
            .findUserByUsername(username,newParams)
            .then(function (user) {
                res.send(user)
                return true;
            },function () {
                res.sendStatus(404).send('User not found for username:' + username);
            });

        }

    function findUserById(req,res) {

        uid = req.params['userId'];


        userModel
            .findUserById(uid)
            .then(function (user) {
                res.send(user)
                return true;
            },function () {
                res.sendStatus(404);
            });
    }

    function createUser(req,res) {


        var newUser = req.body;

        var today = new Date();
        var time = today.getDate() + today.getFullYear() + today.getMonth() + today.getHours() + today.getMinutes() + today.getSeconds();

        time = time.toString();

        if(newUser.password === newUser.verifypassword) {
            var userNew =
                {
                    username: newUser.username,
                    password: newUser.password,
                    firstName: "",
                    email: "",
                    lastName: "",
                    phone:""
                };

            userModel
                .createUser(userNew)
                .then(function (newUser1) {
                    res.json(newUser1);


                    return true;
                },function () {
                    res.sendStatus(404);
                });
        }
    }

    function findUserByCredentials(req,res) {

        var newParams = req.query;
        var username = newParams['username'];
        var password = newParams['password'];


        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {

                res.send(user);
                return true;
            },function () {
                res.sendStatus(404);
            });

            }

};



