myApp.service('InventoryService', ['$http', '$location', function ($http, $location) {
    console.log('InventoryService Loaded');
    let self = this;
    
   
    self.inventory = { 
        list:[ ], 
        inventoryItem : {} 
    };

        //get inventory items
    self.getInventory = function (id){
        console.log(id);
        
        $http({
            method: 'GET',
            url: `/inventory/use/${id}`
        })
        .then(function(response){
            console.log('Inventory items:', response.data);
            self.inventory.list = response.data;
        })
        .catch(function(error){
            console.log('Error getting inventory');
            
        })
    }



        //adding new items to the inventory
    self.addToInventory = function (item){
        console.log('In addToInventory');
        console.log(item);
        
        $http({
            method: 'POST',
            url: '/inventory/use', 
            data: {
                type: self.inventory.inventoryItem.type,
                item: self.inventory.inventoryItem.item,
                description: self.inventory.inventoryItem.description,
                notes: self.inventory.inventoryItem.notes,
                user_id: self.inventory.inventoryItem.userObject.id
            }
        })
        .then(function(response){
            console.log();
            self.getInventory();
        })
        .catch(function(error){
            console.log('Error posting inventory item', error);
        })
    }

}]);
