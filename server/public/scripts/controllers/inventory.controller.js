myApp.controller('InventoryController', ['UserService', 'InventoryService', function (UserService, InventoryService) {
    console.log('InventoryController created');
    let self = this;
    self.userService = UserService;
    self.inventoryService = InventoryService;
    self.addToInventory = InventoryService.addToInventory;
    self.getInventory = InventoryService.getInventory;
    self.inventory = InventoryService.inventory;
    console.log(InventoryService.inventory);
    
    self.inventory.inventoryItem.userObject= UserService.userObject;
    self.userObject = UserService.userObject;
    
    console.log('user is ', self.userObject);
    InventoryService.getInventory(self.userObject.id);
    
}]);
