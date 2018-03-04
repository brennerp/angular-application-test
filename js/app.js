const application = angular.module ('application', []);

application.controller ('FormController', [ '$scope',
  function($scope) {
    var self = this;

    self.contact = {};

    self.contact.contactName = "AAAAAAAAA";

    self.addContact = function () {
      document.getElementById('test').innerHTML += 'aaa';
      document.getElementById('contactList').innerHTML += 'ccc';
      angular.element('contactList').controller('contactList').test();
    }
}]);
