/**
 * Created by panktibhalani on 2/14/17.
 */


(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {



        var api = {

            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "deleteUser" : deleteUser,
            "findUserByUsername" : findUserByUsername
        };
        return api;

        function updateUser(userId, user) {


            return $http.put("/api/user/" + userId, user);

        }

        function deleteUser(uid) {
            return $http.delete("/api/user/"+uid);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        function findUserById(uid) {
            return $http.get("/api/user/" + uid);
        }

        function createUser(newUser) {

            return $http.post("/api/user",newUser);

        }

        function findUserByCredentials(username, password) {

            return $http.get("/api/user?username=" + username + "&password=" + password);
        }
    }
})();