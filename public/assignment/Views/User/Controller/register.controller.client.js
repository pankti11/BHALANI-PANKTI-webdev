/**
 * Created by panktibhalani on 2/14/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController",registerController);

    function registerController(UserService) {
        var vm = this;
        vm.addUser = addUser

        function addUser(newUser) {

            var user = UserService.createUser(newUser)
            if(user == null) {
                vm.error = "unable to add user";
            } else {
                vm.message = "user added successfully";

                vm.user_id = user;
            }
        };
    }
})();