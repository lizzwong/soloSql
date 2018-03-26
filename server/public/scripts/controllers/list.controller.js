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

    self.archiveList = ListService.archiveList;

    self.inventory = InventoryService.inventory;
    self.inventory.list = InventoryService.inventory.list;

    self.getUniversal = ListService.getUniversal;
   
    self.getUniversal().then(function(response){
        //console.log(response);
        self.lists.universal = response
        console.log('Universal items in controller', self.lists.universal);
    });
    self.lists = ListService.lists;

    //self.lists.universal = ListService.lists.universal;
    //console.log('Universal items in controller', ListService.lists.universal);
}]);
