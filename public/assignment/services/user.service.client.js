/**
 * Created by panktibhalani on 2/14/17.
 */


(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "users": users,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "deleteUser" : deleteUser,
            "findUserByUsername" : findUserByUsername
        };
        return api;

        function updateUser(userId, newUser) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return user;
                }
            }
            return null;
        }

        function deleteUser(uid) {
            for(var u in users) {
                var user = users[u];
                if( user._id === uid ) {
                    var index = users.indexOf(user);
                    users.splice(index,1)

                    return uid;
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserById(uid) {
            for(var u in users) {
                var user = users[u];
                if( user._id === uid ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function createUser(newUser) {


            var today = new Date();
            var time = today.getDate() + today.getFullYear() + today.getMonth() + today.getHours() + today.getMinutes() + today.getSeconds();

            time = time.toString();

            if(newUser.password === newUser.verifypassword)
            {
                var userNew =
                    {
                        _id: time,
                        username: newUser.username,
                        password: newUser.password,
                        firstName: "",
                        lastName: ""
                    };
                users.push(userNew);

                return time;
            }




            return null;

        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    return angular.copy(user);
                }
            }
            return null;
        }
    }
})();