/**
 * Created by panktibhalani on 2/14/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider,$httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';


        $routeProvider
            .when("/login",{
                templateUrl: 'Views/User/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("/register",{
                templateUrl: 'Views/User/templates/register.view.client.html',
                controller:'registerController',
                controllerAs: 'model'
            })
            .when("/profile/:uid",{
                templateUrl: 'Views/User/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website",{
                templateUrl: 'Views/Website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/new",{
                templateUrl: 'Views/Website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid",{
                templateUrl: 'Views/Website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'model'
            })

            .when("/user/:uid/website/:wid/page/",{
                templateUrl: 'Views/Pages/templates/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/new",{
                templateUrl: 'Views/Pages/templates/page-new.view.client.html',
                controller: 'PageNewController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl: 'Views/Pages/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'model'
            })

            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl: 'Views/Widget/templates/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl: 'Views/Widget/templates/widget-chooser.view.client.html',
                controller: 'WidgetNewController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl: 'Views/Widget/templates/widget-edit.view.client.html',
                controller: 'WidgetEditController',
                controllerAs: 'model'
            })

    }
})();