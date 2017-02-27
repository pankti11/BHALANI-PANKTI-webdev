/**
 * Created by panktibhalani on 2/14/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController",registerController);

    function registerController(UserService,$location) {
        var vm = this;
        vm.addUser = addUser

        function addUser(newUser) {
            console.log("in client side")
            console.log(newUser);
            var promise = UserService.createUser(newUser);

            promise
                .success(newUserAdd)
                .error(newUserError);
        };

        function newUserAdd(NewUser) {

            $location.url('/profile/' + NewUser._id);

        }

        function newUserError() {
            vm.error = 'sorry could not register';

        }


    }
})();