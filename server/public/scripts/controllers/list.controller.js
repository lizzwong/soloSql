myApp.controller('ListController', ['UserService', 'InventoryService', 'ListService', 
                function (UserService, InventoryService, ListService) {

    console.log('ListController created');
    let self = this;
    self.userService = UserService;
    self.inventoryService = InventoryService;
    self.listService = ListService;
    self.addList = ListService.addList;
    self.getLists = ListService.getLists;
    self.lists = ListService.lists;


    self.lists.newList.userObject = UserService.userObject;
    self.userObject = UserService.userObject;

    ListService.getLists(self.userObject.id);

    self.editList = ListService.editList;
    self.deleteList = ListService.deleteList;
    self.saveList = ListService.saveList;

}]);
