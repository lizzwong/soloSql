myApp.service('ListService', ['$http', '$location', function ($http, $location) {
    console.log('ListService Loaded');
    let self = this;


    self.lists = {
        allLists : [],
        newList : {},
        universal :['banana'],
        viewList: []
    };

        //get all packing lists
    self.getLists = function(id){
       return $http({
            method: 'GET', 
            url: `/lists/${id}`
        })
        .then(function(response){
            console.log('all lists:', response.data);
            self.lists.allLists = response.data;
            return self.lists.allLists;
        })
        .catch(function(error){
            console.log('Error getting lists');
        })
    }

    self.addList = function(list){
        console.log('In addList');
        console.log(list);
        
        $http({
            method: 'POST',
            url: '/lists',
            data: {
                title: self.lists.newList.title,
                departure: self.lists.newList.departure,
                duration: self.lists.newList.duration,
                destination: self.lists.newList.destination,
                method: self.lists.newList.method,
                reminders: self.lists.newList.reminders,
                user_id: self.lists.newList.userObject.id
            }
        })
        .then(function(response){
            console.log('New list added');
            self.getLists(self.lists.newList.userObject.id)
            self.emptyInputs();
        })
        .catch(function(error){
            console.log('Error posting new list', error);
        })
    }

    self.editList = function (list) {
        list.editing = true;
    }

    self.deleteList = function(list){
        console.log('In deleteList');
        console.log(list);

        $http({
            method: 'DELETE',
            url: `/lists/delete/${list.id}`
        })
        .then(function(response){
            console.log('List deleted');
            self.getLists(list.user_id);
        })
        .catch(function(error){
            console.log('Error deleting list', error);
        })
        
    }

    self.saveList = function(list){
        console.log('Updating list', list);
        
        $http({
            method: 'PUT', 
            url: `/lists/${list.id}`,
            data: { list:list }
        })
        .then(function (response){
            console.log('response', response);
            self.getLists(list.user_id);
        })
        .catch(function(error){
            console.log('Error updating list');
        })
    }

    self.archiveList = function(list){
        console.log('Archiving list', list);

        $http({
            method: 'PUT', 
            url: `/lists/archive/${list.id}`,
        })
        .then(function (response){
            console.log('response', response);
            self.getLists(list.user_id)
        })
        .catch(function(error){
            console.log('Error archiving list');
            
        })
    }

    self.emptyInputs = function () {
        self.lists.newList.title = '',
        self.lists.newList.departure = '',
        self.lists.newList.duration = '',
        self.lists.newList.destination = '',
        self.lists.newList.method = '',
        self.lists.newList.reminders = ''
    }

    self.getUniversal = function (){
        console.log('Get universal list');
        
        return $http({
            method: 'GET',
            url: `/lists`
        })
        .then(function (response){
            self.lists.universal = response.data;
            console.log('Universal items', self.lists.universal);
            return self.lists.universal
        })
        .catch(function (error){
            console.log('Error getting universal inventory');
        })
    }
    
    self.listView = function(id){
        console.log('Get list view');
        console.log(id);
        
        $http({
            method: 'GET', 
            url:`/lists/view/${id}`
        })
        .then(function (response){
            self.lists.viewList = response.data;
            console.log('list', response.data);
        })
        .catch(function(error){
            console.log('Error getting list');
            
        })

    }

    self.addItem = function (){
        console.log('In addItem');
        console.log('Add item to Progress');
        
        $http({
            method:'POST',
            url: `/lists/progress`,
            data: {
                item_id : item.id,
                item : item.item,
                trip_id : trip.id
            }
        })
        .then(function(response){
            self.listView(trip.id)
        })
        .catch(function(error){
            console.log('Error adding to list view');
            
        })
    }
    
    
}]);