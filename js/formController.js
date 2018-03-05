const application = angular.module ('application', []);

application.controller ('FormController', [ '$scope',
  function($scope) {
    const self = this;

    self.$onInit = function () {
      $scope.telephoneIDCount = 0;

      $scope.contact = {};
      $scope.contact.contactName = '';
      $scope.contact.telephones = [];
    }

    self.addPhone = function () {
        self.addSpecificPhoneNumber ('');
    }

    self.addSpecificPhoneNumber = function (number) {
      $scope.contact.telephones.push ( {id: $scope.telephoneIDCount, number: number});
      $scope.telephoneIDCount ++;
      if ($scope.telephoneIDCount >= 1000) {
        $scope.telephoneIDCount = 0;
      }
    }

    self.deletePhone = function (index) {
      if (index >= 0 && index < $scope.contact.telephones.length) {
        $scope.contact.telephones.splice (index, 1);
      }
    }

    self.updatePhone = function (index, value) {
      if (index >= 0 && index < $scope.contact.telephones.length) {
        $scope.contact.telephones [index].number = value;
      }
    }

    self.allContacts = [
      {
        contactName: "Alberto",
        observation: "Filho do João",
        email: "alberto1992@fulano.com",
        telephones: [
          { number: "aaaa aaa aaaaa" },
          { number: "bbb bbbbb bbbbb" }
        ]
      },
      {
        contactName: "João",
        observation: "Amigo da Sandra",
        email: "joaorodrigo@fulano.com",
        telephones: [
          { number: "ccc cccc cccccc" },
          { number: "ddd dddd ddddd" }
        ]
      }
    ];

    self.addContact = function (contact) {
      console.log ("Telephones: " + contact.telephones.length);
      var newContact = angular.copy (contact);
      for (var telephone in contact.telephones) {
        console.log (telephone.number);
      }
      self.allContacts.push (newContact);
    }

}]);
