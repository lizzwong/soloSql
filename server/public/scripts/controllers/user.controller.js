myApp.controller('UserController', ['UserService', function(UserService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  console.log('user',self.userObject);
  
  self.updateUser = UserService.updateUser;
  self.user = UserService.user;
  self.profilePic = UserService.profilePic
 
}]);
