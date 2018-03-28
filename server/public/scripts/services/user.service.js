myApp.service('UserService', ['$http', '$location', function($http, $location){
  console.log('UserService Loaded');
  var self = this;

  self.fileStack = filestack.init('AGYranmHiSPmDq9MrDxyjz');

  self.userObject = {};

  self.getuser = function(){
    //console.log('UserService -- getuser', self.userObject);
    $http.get('/api/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            self.userObject.id = response.data.id;
            self.userObject.email = response.data.email;
            self.userObject.phone = response.data.phone;
            self.userObject.picture = response.data.picture;
            //console.log('UserService -- getuser -- User Data: ', self.userObject);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/api/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }

  self.updateUser = function(userObject){
    console.log('In updateUser')
    console.log(userObject.id);
    
    $http({
      method: 'PUT', 
      url: `/api/user/${userObject.id}`,
      data: {userObject:userObject}
    })
    .then(function(response){
      console.log('response', response);
      
    })
    .catch(function(error){
      console.log('Error updating user');
    })

  }

  self.profilePic = function(){
    console.log('In profile upload');
    
    self.fileStack.pick({
      accept: 'image/*',
      maxFiles: 1
    })
    .then(function(result){
      console.log('response', result);
      alert("Successful upload!");
      self.userObject.picture = result.filesUploaded[0].url;
      console.log('New profile pic', self.userObject.picture);

      self.updateUser(self.userObject.picture)
      
    })
    .catch(function(error){
      console.log('Error updating user');
    })

  }


  
}]);
