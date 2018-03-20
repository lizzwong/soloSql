myApp.service('InventoryService', ['$http', '$location', function ($http, $location) {
    console.log('InventoryService Loaded');
    let self = this;
    
    self.inventoryItem = { };
    self.inventoryList = { list:[] };

        //get inventory items
    self.getInventory = function (){
        $http({
            method: 'GET',
            url:'/inventory'
        })
        .then(function(response){
            console.log('Got inventory items', response.data);
            self.inventoryList = response.data;
        })
        .catch(function(error){
            console.log('Error getting inventory');
            
        })
    }

        //adding new items to the inventory
    self.addToInventory = function (){
        console.log('In addToInventory');
        console.log(self.inventoryItem);
        
        $http({
            method: 'POST',
            url: '/inventory/use',
            data: {
                type: inventoryItem.type,
                item: inventoryItem.item,
                details: inventoryItem.description,
                notes: inventoryItem.notes,
                user: self.userObject.userName
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
