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
            url: `/inventory/${id}`
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
            url: '/inventory', 
            data: {
                type: self.inventory.inventoryItem.type,
                item: self.inventory.inventoryItem.item,
                description: self.inventory.inventoryItem.description,
                notes: self.inventory.inventoryItem.notes,
                user_id: self.inventory.inventoryItem.userObject.id
            }
        })
        .then(function(response){
            console.log('Inventory item added');
            self.getInventory(self.inventory.inventoryItem.userObject.id);
            self.emptyInputs();
        })
        .catch(function(error){
            console.log('Error posting inventory item', error);
        })
    }

    self.deleteInventoryItem = function(item){
        console.log('In deleteInventoryItem');
        console.log(item);
        
        $http({
            method: 'DELETE',
            url: `/inventory/delete/${item.id}`
        })
        .then(function(response){
            console.log('Item deleted');
            self.getInventory(item.user_id);
        })
        .catch(function(error){
            console.log('Error deleting item', error);
        })
    }

    self.editInventoryItem = function(item){
        item.editing = true;
    }

    self.saveInventoryItem = function(item){
        console.log('Updating invntory item',item);
        
        $http({
            method: 'PUT',
            url: `/inventory/${item.id}`,
            data: { item:item }
        })
        .then(function(response){
            console.log('response', response);
            self.getInventory(item.user_id);
        })
        .catch(function(error){
            console.log('Error updating item');
        })
    }

    self.emptyInputs = function(){
        self.inventory.inventoryItem.type = '', 
        self.inventory.inventoryItem.item = '',
        self.inventory.inventoryItem.description = '',
        self.inventory.inventoryItem.notes = '',
        self.inventory.inventoryItem.userObject.id = ''
    }
}]);
