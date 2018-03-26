myApp.controller('ListController', ['UserService', 'InventoryService', 'ListService', 
                function (UserService, InventoryService, ListService) {

    console.log('ListController created');
    let self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.inventoryService = InventoryService;
    self.listService = ListService;
    self.addList = ListService.addList;
    self.getLists = ListService.getLists;
    self.lists = ListService.lists;
    // self.lists.allLists = ListService.lists.allLists;
    // console.log(self.lists.allLists);
    
    self.getLists(self.userObject.id);
    console.log(self.lists.allLists);

    self.getLists().then(function (response) {
        self.lists.allLists = response;
        console.log('All lists in controller', self.lists.allLists);

    })

    self.lists.newList.userObject = UserService.userObject;
    self.userObject = UserService.userObject;

    ListService.getLists(self.userObject.id);

    self.editList = ListService.editList;
    self.deleteList = ListService.deleteList;
    self.saveList = ListService.saveList;

    self.archiveList = ListService.archiveList;

    self.inventory = InventoryService.inventory;
    self.inventory.list = InventoryService.inventory.list;
    InventoryService.getInventory(self.userObject.id);

    self.getUniversal = ListService.getUniversal;
   
    self.getUniversal().then(function(response){
        //console.log(response);
        self.lists.universal = response
        //console.log('Universal items in controller', self.lists.universal);
    });

    self.findItem = InventoryService.findItem;
    self.addItem = ListService.addItem;
}]);
