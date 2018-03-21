myApp.controller('NewListController', ['UserService', 'InventoryService', function (UserService, InventoryService) {
    console.log('NewListController created');
    let self = this;
    self.userService = UserService;
    self.inventoryService = InventoryService;
    
}]);
