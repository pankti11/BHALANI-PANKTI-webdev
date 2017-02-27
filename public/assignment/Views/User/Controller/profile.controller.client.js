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


        function update(user) {

            console.log(user);
            var promise = UserService.updateUser(userId, user);

            promise
                .success(updateUser)
                .error(UpdateError)
        }

        function UpdateError() {
            vm.error = "unable to update user";
        }

        function updateUser(user) {
            vm.message = "user successfully updated";
        }

        function init() {
            UserService
                .findUserById(userId)
                .success(displayUser);

        }

        function displayUser(user) {
            vm.user = user;
            vm.user_id = userId;
            console.log(user);
        }

         function deleteProfile(userID_to_be_deleted) {
             var answer = confirm("Are you sure?");

             if (answer) {
                 UserService
                     .deleteUser(userID_to_be_deleted)
                     .success(userDeleted)
                     .error(userError);
             }
         }

         function userDeleted() {
             alert("User deleted successfully");
         }

         function userError() {
             alert("User is not deleted successfully");
         }

    }
})();