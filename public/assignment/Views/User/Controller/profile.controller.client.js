/**
 * Created by panktibhalani on 2/14/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.update = update;
        vm.delete = deleteProfile;
        init();


        function update(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if (user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        };

        function init() {
            var user = UserService.findUserById(userId);
            vm.user = user;
            vm.user_id = userId;

        };




         function deleteProfile(userID_to_be_deleted) {

            var user_to_be_deleted = UserService.deleteUser(userID_to_be_deleted);

            if (user_to_be_deleted == null){
                alert("User is not deleted successfully")
            }
            else {
                alert("User deleted successfully")
            }

        }
    }
})();