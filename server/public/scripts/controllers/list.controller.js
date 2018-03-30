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
    console.log(self.lists.allLists);
    

    self.getLists(self.userObject.id).then(function(response) {
        self.lists.allLists = response;
        console.log('All lists in controller', self.lists.allLists);

    })

    //----making/editing lists----
    self.lists.newList.userObject = UserService.userObject;
    self.userObject = UserService.userObject;

    ListService.getLists(self.userObject.id);

    self.editList = ListService.editList;
    self.deleteList = ListService.deleteList;
    self.saveList = ListService.saveList;

    self.archiveList = ListService.archiveList;

    //----calling in inventory----
    self.inventory = InventoryService.inventory;
    self.inventory.list = InventoryService.inventory.list;
    InventoryService.getInventory(self.userObject.id);

    //----get universal lists----
    self.getUniversal = ListService.getUniversal;

    self.getUniversal().then(function(response){
        //console.log(response);
        self.lists.universal = response;
        
    });

    //----adding item to packing list----
    self.addItem = ListService.addItem;
    self.item = ListService.item;
    
    //----accessing the last item of list array----
    self.lastList = self.lists.allLists[self.lists.allLists.length - 1];
    console.log(self.lists.allLists[self.lists.allLists.length - 1]);


    //----calling list items----
    self.listView = ListService.listView;

    self.listView(self.lastList).then(function(response){
       self.lists.viewList = response;
       console.log(self.lists.viewList);
        
    });

    ListService.listView(ListService.lists.allLists.id)
    // self.lists.viewList = ListService.viewList;
    // console.log(self.lists.viewList);
    
    //----deleting/editing packing lists----
    self.deleteListItem = ListService.deleteListItem;
    self.complete = ListService.complete;

    //----nodemailer----
    self.email = ListService.email;
    // self.email(self.lists.allLists.id, self.userObject.email)

}]);
