myApp.service('ListService', ['$http', '$location', function ($http, $location) {
    console.log('ListService Loaded');
    let self = this;


    self.lists = {
        allLists : [],
        newList : {}
    };

        //get all packing lists
    self.getLists = function(id){
        $http({
            method: 'GET', 
            url: `/lists/${id}`
        })
        .then(function(response){
            console.log('all lists:', response.data);
            self.lists.allLists = response.data;
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

    self.emptyInputs = function () {
        self.lists.newList.title = '',
        self.lists.newList.departure = '',
        self.lists.newList.duration = '',
        self.lists.newList.destination = '',
        self.lists.newList.method = '',
        self.lists.newList.reminders = ''
    }

}]);