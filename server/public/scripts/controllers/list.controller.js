myApp.controller('ListController', ['UserService', 'InventoryService', 'ListService', 
                function (UserService, InventoryService, ListService) {

    console.log('ListController created');
    let self = this;
    self.userService = UserService;
    self.inventoryService = InventoryService;

}]);
