/**
 * Created by panktibhalani on 2/14/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);
    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password)
                promise
                    .success(foundUser)
                    .error(foundUserError);
        }

        function foundUser(loginUser) {
            $location.url('/profile/' + loginUser._id);
            vm.user_id = loginUser._id;
        }

        function foundUserError() {
            vm.error = 'user not found';
        }

    }
})();