'use strict';
(function () {
    angular.module("umbraco")
    .controller("uContactor.ConfirmationDialog.controller",
        function ($scope, dialogService, $compile) {
            $scope.message = $scope.dialogData;

            $scope.ok = function () {
                dialogService.close($scope.$parent.dialogOptions, { resp: "ok" });
            };

            $scope.cancel = function () {
                dialogService.close($scope.$parent.dialogOptions, { resp: "cancel" });
            };
        })
    .controller("uContactor.DeleteContact.controller",
        function ($scope, dialogService, $http, $route, umbRequestHelper) {
            $scope.contact = $scope.dialogData;

            $scope.delete = function (id) {
                var req = { id: id };

                if (id > 0) {
                    $http({
                        method: "POST",
                        url: "/Umbraco/uContactor/uContactorApi/MoveToTrash",
                        params: req,
                        config: { timeout: 30000 }
                    })
                        .success(function (resp) {
                            dialogService.closeAll({ dialogData: $scope.contact, resp: resp });
                        }).error(function (resp) {
                            dialogService.closeAll({ dialogData: $scope.contact, resp: resp });
                        });
                }
            }

            $scope.cancelDelete = function () {
                dialogService.closeAll({ dialogData: $scope.contact, resp: "cancel" });
            };
        })
    .controller("uContactor.PermanentDeleteContact.controller",
        function ($scope, dialogService, $http, $route, umbRequestHelper) {
            $scope.contact = $scope.dialogData;

            $scope.delete = function (id) {
                var req = { id: id };

                if (id > 0) {
                    $http({
                        method: "POST",
                        url: "/Umbraco/uContactor/uContactorApi/DeleteForever",
                        params: req,
                        config: { timeout: 30000 }
                    })
                        .success(function (resp) {
                            dialogService.closeAll({ dialogData: $scope.contact, resp: resp });
                        }).error(function (resp) {
                            dialogService.closeAll({ dialogData: $scope.contact, resp: resp });
                        });
                }
            }

            $scope.cancelDelete = function () {
                dialogService.closeAll({ dialogData: $scope.contact, resp: "cancel" });
            };
        })
    .controller("uContactor.RestoreContact.controller",
        function ($scope, dialogService, $http, $route, umbRequestHelper) {
            $scope.contact = $scope.dialogData;

            $scope.restore = function (id) {
                var req = { id: id };

                if (id > 0) {
                    $http({
                        method: "POST",
                        url: "/Umbraco/uContactor/uContactorApi/RemoveFromTrash",
                        params: req,
                        config: { timeout: 30000 }
                    })
                        .success(function (resp) {
                            dialogService.closeAll({ dialogData: $scope.contact, resp: resp });
                        }).error(function (resp) {
                            dialogService.closeAll({ dialogData: $scope.contact, resp: resp });
                        });
                }
            }

            $scope.cancelRestore = function () {
                dialogService.closeAll({ dialogData: $scope.contact, resp: "cancel" });
            };
        })
    .controller("uContactor.SpamContact.controller",
        function ($scope, dialogService, $http, $route, umbRequestHelper) {
            $scope.contact = $scope.dialogData;

            $scope.spam = function (id) {
                var req = { id: id };

                if (id > 0) {
                    $http({
                        method: "POST",
                        url: "/Umbraco/uContactor/uContactorApi/MoveSpam",
                        params: req,
                        config: { timeout: 30000 }
                    })
                        .success(function (resp) {
                            dialogService.closeAll({ dialogData: $scope.contact, resp: resp });
                        }).error(function (resp) {
                            dialogService.closeAll({ dialogData: $scope.contact, resp: resp });
                        });
                }
            }

            $scope.cancelSpam = function () {
                dialogService.closeAll({ dialogData: $scope.contact, resp: "cancel" });
            };
        })
    .controller("uContactor.UnSpamContact.controller",
        function ($scope, dialogService, $http, $route, umbRequestHelper) {
            $scope.contact = $scope.dialogData;

            $scope.unSpam = function (id) {
                var req = { id: id };

                if (id > 0) {
                    $http({
                        method: "POST",
                        url: "/Umbraco/uContactor/uContactorApi/RemoveFromSpam",
                        params: req,
                        config: { timeout: 30000 }
                    })
                        .success(function (resp) {
                            dialogService.closeAll({ dialogData: $scope.contact, resp: resp });
                        }).error(function (resp) {
                            dialogService.closeAll({ dialogData: $scope.contact, resp: resp });
                        });
                }
            }

            $scope.cancelSpam = function () {
                dialogService.closeAll({ dialogData: $scope.contact, resp: "cancel" });
            };
        })
    .controller("uContactor.DetailContact.controller",
        function ($scope, dialogService, $http, $route, umbRequestHelper, notificationsService, $timeout) {
            $scope.contact = $scope.dialogData;
            $scope.contact.reply_message = {
                label: 'bodyText',
                view: 'rte',
                config: {
                    editor: {
                        toolbar: ["code", "undo", "redo", "cut", "styleselect", "bold", "italic", "alignleft", "aligncenter", "alignright", "bullist", "numlist", "link", "umbmediapicker", "umbmacro", "table", "umbembeddialog"],
                        stylesheets: [],
                        dimensions: { height: 400 }
                    }
                }
            }

            $scope.close = function () {
                dialogService.close($scope.$parent.dialogOptions, { dialogData: $scope.contact, resp: "cancel" });
            };

            $scope.save = function (data) {
                var message = "<h4>Are you sure want to reply this contact message?</h4>";

                var confirmationDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/confirmationDialog.html',
                    show: true,
                    dialogData: message,
                    closeCallback: done
                });

                function done(resp) {
                    if (resp.resp == "ok") {
                        
                        var message = data.reply_message.value;
                        var id = data.Id;
                        var req = {
                            message: message,
                            id: id
                        };

                        if (message.trim().length > 0) {
                            $http({
                                method: "POST",
                                url: "/Umbraco/uContactor/uContactorApi/ReplyContact",
                                params: req,
                                config: { timeout: 30000 }
                            })
                                .success(function (resp) {
                                    if (resp != null) {
                                        resp.status = "reply"
                                        dialogService.close($scope.$parent.dialogOptions, { resp: resp });
                                    } else {
                                        resp.status = "failed"
                                        dialogService.close($scope.$parent.dialogOptions, { resp: resp });
                                    }
                                }).error(function (resp) {
                                    dialogService.close($scope.$parent.dialogOptions, { resp: resp });
                                });
                        }
                    }
                }
            }
        })
    .controller("uContactor.AllContact.controller",
        function ($scope, $http, $route, $routeParams, notificationsService, dialogService, $rootScope, $compile, $log, $q, $templateCache, umbRequestHelper, $timeout, navigationService) {
            $scope.contact = {};
            $scope.search = '';
            $scope.sortContact = 'desc';
            $scope.messageType = 'all';

            $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                    "filter="
                    + "&sort="
                    + "&orderBy="
                    + "&search="
                    + "&page=")
                .success(function (data) {
                    $scope.contact = data;
                    
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });

            $scope.markSpam = function (data) {
                dialogService.closeAll();

                var spamDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/spamDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been moved to spam");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to move contact to spam, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.unSpam = function (data) {
                dialogService.closeAll();
                var spamDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/unspamDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been marked as not spam");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to mark contact as not spam, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.deleteContact = function (data) {
                dialogService.closeAll();
                var deleteDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/deleteDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been deleted");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to delete contact, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.restoreContact = function (data) {
                dialogService.closeAll();
                var deleteDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/restoreDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been restored");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to restore contact, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.contactDetail = function (data) {
                dialogService.closeAll();
                var detailDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/detailDialog.html',
                    closeCallback: done,
                    dialogData: data,
                    show: true
                });

                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp.status = "reply") {
                                notificationsService.success("Success", "Reply contact has been send, page will refreshed");
                                $timeout(function() {
                                    $route.reload();
                                }, 3000);
                            } else if (data.resp.status = "failed") {
                                notificationsService.error("Error", "Failed to reply contact, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.goToPage = function (page) {
                $scope.sortContact = angular.isUndefined($scope.sortContact) ? "desc" : $scope.sortContact;
                $scope.search = angular.isUndefined($scope.search) ? "" : $scope.search;
                $scope.contact.CurrentPage = page;

                $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                     "filter="
                     + "&sort=" + $scope.sortContact
                     + "&orderBy="
                     + "&search=" + $scope.search
                     + "&page=" + page)
                .success(function (data) {
                    $scope.contact = data;
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });
            }

            $scope.clearSearch = function (query, sort) {
                query = '';
                $scope.search = '';
                $scope.searchPost(query, sort);
            }

            $scope.searchPost = function (query, sort) {
                sort = angular.isUndefined(sort) ? "desc" : sort;
                query = angular.isUndefined(query) ? "" : query;
                var filter = $scope.messageType === 'all' ? '' : $scope.messageType;

                $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                     "filter=" + filter
                     + "&sort=" + sort
                     + "&orderBy="
                     + "&search=" + query
                     + "&page=")
                .success(function (data) {
                    $scope.contact = data;
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });
            }

            navigationService.syncTree({ tree: 'uContactorSection', path: ["-1", "dashboard"], forceReload: false });
        })
    .controller("uContactor.RepliedContact.controller",
        function ($scope, $http, $route, $routeParams, notificationsService, dialogService, $rootScope, $compile, $log, $q, $templateCache, umbRequestHelper, $timeout, navigationService) {
            $scope.contact = {};
            $scope.search = '';
            $scope.sortContact = 'desc';

            $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                    "filter=replied"
                    + "&sort="
                    + "&orderBy="
                    + "&search="
                    + "&page=")
                .success(function (data) {
                    $scope.contact = data;
                    
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });

            $scope.markSpam = function (data) {
                dialogService.closeAll();

                var spamDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/spamDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been moved to spam");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to move contact to spam, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.deleteContact = function (data) {
                dialogService.closeAll();
                var deleteDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/deleteDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been deleted");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to delete contact, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.contactDetail = function (data) {
                dialogService.closeAll();
                var detailDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/detailDialog.html',
                    closeCallback: done,
                    dialogData: data,
                    show: true
                });

                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp.status = "reply") {
                                notificationsService.success("Success", "Reply contact has been send, page will refreshed");
                                $timeout(function () {
                                    $route.reload();
                                }, 3000);
                            } else if (data.resp.status = "failed") {
                                notificationsService.error("Error", "Failed to reply contact, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.goToPage = function (page) {
                $scope.sortContact = angular.isUndefined($scope.sortContact) ? "desc" : $scope.sortContact;
                $scope.search = angular.isUndefined($scope.search) ? "" : $scope.search;
                $scope.contact.CurrentPage = page;

                $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                     "filter=replied"
                     + "&sort=" + $scope.sortContact
                     + "&orderBy="
                     + "&search=" + $scope.search
                     + "&page=" + page)
                .success(function (data) {
                    $scope.contact = data;
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });
            }

            $scope.clearSearch = function (query, sort) {
                query = '';
                $scope.search = '';
                $scope.searchPost(query, sort);
            }

            $scope.searchPost = function (query, sort) {
                sort = angular.isUndefined(sort) ? "desc" : sort;
                query = angular.isUndefined(query) ? "" : query;

                $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                     "filter=replied"
                     + "&sort=" + sort
                     + "&orderBy="
                     + "&search=" + query
                     + "&page=")
                .success(function (data) {
                    $scope.contact = data;
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });
            }
            
            navigationService.syncTree({ tree: 'uContactorSection', path: ["-1", "replied"], forceReload: false });
        })
    .controller("uContactor.UnRepliedContact.controller",
        function ($scope, $http, $route, $routeParams, notificationsService, dialogService, $rootScope, $compile, $log, $q, $templateCache, umbRequestHelper, $timeout, navigationService) {
            $scope.contact = {};
            $scope.search = '';
            $scope.sortContact = 'desc';

            $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                    "filter=unreplied"
                    + "&sort="
                    + "&orderBy="
                    + "&search="
                    + "&page=")
                .success(function (data) {
                    $scope.contact = data;
                    
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });

            $scope.markSpam = function (data) {
                dialogService.closeAll();

                var spamDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/spamDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been moved to spam");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to move contact to spam, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.deleteContact = function (data) {
                dialogService.closeAll();
                var deleteDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/deleteDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been deleted");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to delete contact, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.contactDetail = function (data) {
                dialogService.closeAll();
                var detailDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/detailDialog.html',
                    closeCallback: done,
                    dialogData: data,
                    show: true
                });

                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp.status = "reply") {
                                notificationsService.success("Success", "Reply contact has been send, page will refreshed");
                                $timeout(function () {
                                    $route.reload();
                                }, 3000);
                            } else if (data.resp.status = "failed") {
                                notificationsService.error("Error", "Failed to reply contact, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.goToPage = function (page) {
                $scope.sortContact = angular.isUndefined($scope.sortContact) ? "desc" : $scope.sortContact;
                $scope.search = angular.isUndefined($scope.search) ? "" : $scope.search;
                $scope.contact.CurrentPage = page;

                $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                     "filter=unreplied"
                     + "&sort=" + $scope.sortContact
                     + "&orderBy="
                     + "&search=" + $scope.search
                     + "&page=" + page)
                .success(function (data) {
                    $scope.contact = data;
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });
            }

            $scope.clearSearch = function (query, sort) {
                query = '';
                $scope.search = '';
                $scope.searchPost(query, sort);
            }

            $scope.searchPost = function (query, sort) {
                sort = angular.isUndefined(sort) ? "desc" : sort;
                query = angular.isUndefined(query) ? "" : query;

                $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                     "filter=unreplied"
                     + "&sort=" + sort
                     + "&orderBy="
                     + "&search=" + query
                     + "&page=")
                .success(function (data) {
                    $scope.contact = data;
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });
            }
            
            navigationService.syncTree({ tree: 'uContactorSection', path: ["-1", "unreplied"], forceReload: false });
        })
    .controller("uContactor.SpammedContact.controller",
        function ($scope, $http, $route, $routeParams, notificationsService, dialogService, $rootScope, $compile, $log, $q, $templateCache, umbRequestHelper, $timeout, navigationService) {
            $scope.contact = {};
            $scope.search = '';
            $scope.sortContact = 'desc';

            $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                    "filter=spam"
                    + "&sort="
                    + "&orderBy="
                    + "&search="
                    + "&page=")
                .success(function (data) {
                    $scope.contact = data;
                    
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });

            $scope.unSpam = function (data) {
                dialogService.closeAll();
                var spamDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/unspamDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been marked as not spam");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to mark contact as not spam, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.deleteContact = function (data) {
                dialogService.closeAll();
                var deleteDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/deleteDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been deleted");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to delete contact, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.contactDetail = function (data) {
                dialogService.closeAll();
                var detailDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/detailDialog.html',
                    closeCallback: done,
                    dialogData: data,
                    show: true
                });

                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp.status = "reply") {
                                notificationsService.success("Success", "Reply contact has been send, page will refreshed");
                                $timeout(function () {
                                    $route.reload();
                                }, 3000);
                            } else if (data.resp.status = "failed") {
                                notificationsService.error("Error", "Failed to reply contact, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.goToPage = function (page) {
                $scope.sortContact = angular.isUndefined($scope.sortContact) ? "desc" : $scope.sortContact;
                $scope.search = angular.isUndefined($scope.search) ? "" : $scope.search;
                $scope.contact.CurrentPage = page;

                $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                     "filter=spam"
                     + "&sort=" + $scope.sortContact
                     + "&orderBy="
                     + "&search=" + $scope.search
                     + "&page=" + page)
                .success(function (data) {
                    $scope.contact = data;
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });
            }

            $scope.clearSearch = function (query, sort) {
                query = '';
                $scope.search = '';
                $scope.searchPost(query, sort);
            }

            $scope.searchPost = function (query, sort) {
                sort = angular.isUndefined(sort) ? "desc" : sort;
                query = angular.isUndefined(query) ? "" : query;

                $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                     "filter=spam"
                     + "&sort=" + sort
                     + "&orderBy="
                     + "&search=" + query
                     + "&page=")
                .success(function (data) {
                    $scope.contact = data;
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });
            }

            navigationService.syncTree({ tree: 'uContactorSection', path: ["-1", "spam"], forceReload: false });
        })
    .controller("uContactor.DeletedContact.controller",
        function ($scope, $http, $route, $routeParams, notificationsService, dialogService, $rootScope, $compile, $log, $q, $templateCache, umbRequestHelper, $timeout, navigationService) {
            $scope.contact = {};
            $scope.search = '';
            $scope.sortContact = 'desc';

            $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                    "filter=trash"
                    + "&sort="
                    + "&orderBy="
                    + "&search="
                    + "&page=")
                .success(function (data) {
                    $scope.contact = data;
                    
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });

            $scope.markSpam = function (data) {
                dialogService.closeAll();

                var spamDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/spamDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been moved to spam");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to move contact to spam, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.unSpam = function (data) {
                dialogService.closeAll();
                var spamDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/unspamDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been marked as not spam");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to mark contact as not spam, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.deleteContact = function (data) {
                dialogService.closeAll();
                var deleteDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/deleteDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been deleted");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to delete contact, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.permanentDelete = function (data) {
                dialogService.closeAll();
                var deleteDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/permanentDeleteDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been deleted");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to delete contact, please try again later");
                            }
                        }
                    }
                }
                
            }

            $scope.restoreContact = function (data) {
                dialogService.closeAll();
                var deleteDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/restoreDialog.html',
                    show: true,
                    dialogData: data,
                    closeCallback: done
                });
                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp == "true") {
                                notificationsService.success("Success", "Contact has been restored");
                                $route.reload();
                            } else {
                                notificationsService.error("Error", "Failed to restore contact, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.contactDetail = function (data) {
                dialogService.closeAll();
                var detailDialog = dialogService.open({
                    template: '/App_Plugins/uContactor/backoffice/uContactorSection/detailDialog.html',
                    closeCallback: done,
                    dialogData: data,
                    show: true
                });

                function done(data) {
                    if (data != null) {
                        if (data.resp != "cancel" && data.resp != null) {
                            if (data.resp.status = "reply") {
                                notificationsService.success("Success", "Reply contact has been send, page will refreshed");
                                $timeout(function () {
                                    $route.reload();
                                }, 3000);
                            } else if (data.resp.status = "failed") {
                                notificationsService.error("Error", "Failed to reply contact, please try again later");
                            }
                        }
                    }
                }
            }

            $scope.goToPage = function (page) {
                $scope.sortContact = angular.isUndefined($scope.sortContact) ? "desc" : $scope.sortContact;
                $scope.search = angular.isUndefined($scope.search) ? "" : $scope.search;
                $scope.contact.CurrentPage = page;

                $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                     "filter=trash"
                     + "&sort=" + $scope.sortContact
                     + "&orderBy="
                     + "&search=" + $scope.search
                     + "&page=" + page)
                .success(function (data) {
                    $scope.contact = data;
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });
            }

            $scope.clearSearch = function (query, sort) {
                query = '';
                $scope.search = '';
                $scope.searchPost(query, sort);
            }

            $scope.searchPost = function (query, sort) {
                sort = angular.isUndefined(sort) ? "desc" : sort;
                query = angular.isUndefined(query) ? "" : query;

                $http.get("/Umbraco/uContactor/uContactorApi/GetAllContacts?" +
                     "filter=trash"
                     + "&sort=" + sort
                     + "&orderBy="
                     + "&search=" + query
                     + "&page=")
                .success(function (data) {
                    $scope.contact = data;
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact, please try again later / refresh page");
                });
            }

            navigationService.syncTree({ tree: 'uContactorSection', path: ["-1", "deleted"], forceReload: false });
        })
    .controller("uContactor.Settings.controller",
        function ($scope, dialogService, $routeParams, $http, $route, umbRequestHelper, notificationsService, $timeout, $filter, navigationService) {
            $scope.temp = {};
            $scope.tabs = [{ id: 1, label: "Auto Reply Message" }, { id: 2, label: "Notification Message" }, { id: 3, label: "Others" }];

            $scope.settings = {};
            $scope.auto_reply_message = {
                label: 'bodyText',
                view: 'rte',
                config: {
                    editor: {
                        toolbar: ["code", "undo", "redo", "cut", "styleselect", "bold", "italic", "alignleft", "aligncenter", "alignright", "bullist", "numlist", "link", "umbmediapicker", "umbmacro", "table", "umbembeddialog"],
                        stylesheets: [],
                        dimensions: { height: 400 }
                    }
                }
            }
            $scope.notification_message = {
                label: 'bodyText',
                view: 'rte',
                config: {
                    editor: {
                        toolbar: ["code", "undo", "redo", "cut", "styleselect", "bold", "italic", "alignleft", "aligncenter", "alignright", "bullist", "numlist", "link", "umbmediapicker", "umbmacro", "table", "umbembeddialog"],
                        stylesheets: [],
                        dimensions: { height: 400 }
                    }
                }
            }
            $scope.auto_template = {
                label: 'Auto Reply Template',
                description: 'Select auto reply template',
                view: 'contentpicker',
                config: {
                    multiPicker: "0",
                    entityType: "Document",
                    startNode: {
                        query: "",
                        type: "content",
                        id: -1
                    },
                    filter: "",
                    minNumber: 0,
                    maxNumber: 1
                }
            };
            $scope.notification_template = {
                label: 'Notification Template',
                description: 'Select notification template',
                view: 'contentpicker',
                config: {
                    multiPicker: "0",
                    entityType: "Document",
                    startNode: {
                        query: "",
                        type: "content",
                        id: -1
                    },
                    filter: "",
                    minNumber: 0,
                    maxNumber: 1
                }
            };

            $http.get("/Umbraco/uContactor/uContactorApi/GetSettings")
                .success(function(data) {
                    $scope.settings = data;
                    var found = $filter('filter')($scope.settings, { ConfigName: "AutoReplyMessage" }, true);
                    $scope.auto_reply_message.value = found[0].ConfigValue;
                    found = $filter('filter')($scope.settings, { ConfigName: "NotificationMessage" }, true);
                    $scope.notification_message.value = found[0].ConfigValue;
                    $scope.auto_template.value = $filter('filter')($scope.settings, { ConfigName: "TemplateNode" }, true)[0].ConfigValue;
                    $scope.notification_template.value = $filter('filter')($scope.settings, { ConfigName: "NotificationTemplateNode" }, true)[0].ConfigValue;
                })
                .error(function (resp) {
                    notificationsService.error("Error", "Failed to retrieve contact settings, please try again later / refresh page");
                });

            $scope.save = function () {
                var config = [];

                angular.forEach($scope.settings, function (value, key) {
                    var temp = {
                        Id: value.Id,
                        ConfigName: value.ConfigName,
                        ConfigValue: value.ConfigValue,
                        ConfigText: value.ConfigText,
                        ConfigHelper: value.ConfigHelper,
                        ConfigSort: value.ConfigSort
                    }
                    if (value.ConfigName === "AutoReplyMessage") {
                        temp.ConfigValue = $scope.auto_reply_message.value;
                    }else if (value.ConfigName === "NotificationMessage") {
                        temp.ConfigValue = $scope.notification_message.value;
                    } else if (value.ConfigName === "TemplateNode") {
                        temp.ConfigValue = $scope.auto_template.value;
                    } else if (value.ConfigName === "NotificationTemplateNode") {
                        temp.ConfigValue = $scope.notification_template.value;
                    }

                    config.push(temp);
                });

                var param = {
                    config: config
                };

                $http({
                    method: "POST",
                    url: "/Umbraco/uContactor/uContactorApi/UpdateSettings",
                    data: config,
                    config:{timeout:30000}
                }).success(function(resp) {
                    if (angular.isArray(resp)) {
                        notificationsService.success("Success", "Contact settings has been changed");
                    } else {
                        notificationsService.error("Error", "Failed to save contact settings, please try again later / refresh page");
                    }
                });
            }

            $scope.otherSettings = function (item) {
                if (item.ConfigText.toLowerCase().indexOf("auto") > -1 || item.ConfigText.toLowerCase().indexOf("notification") > -1) {
                    return false;
                }
                return true;
            };

            navigationService.syncTree({ tree: 'uContactorSection', path: ["-1", "settings"], forceReload: false });
        });
})();
