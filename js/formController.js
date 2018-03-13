angular.module ('application').controller ('FormController', [ '$scope', '$http',
  function ($scope, $http) {
    const self = this;

    self.$onInit = function () {
      self.allContacts = [];
      $scope.telephoneIDCount = 0;
      $scope.addressIDCount = 0;

      $scope.contact = {};
      $scope.contact.contactName = '';
      $scope.contact.telephones = [];
      $scope.contact.addresses = [];

      self.hasLocalStorage = self.supportsLocalStorage();
      self.loadContactList ();
    }

    // localStorage detection
    self.supportsLocalStorage = function () {
      return typeof(Storage) !== 'undefined';
    }

    self.addContact = function (contact) {
      var newContact = angular.copy (contact);
      self.allContacts.push (newContact);
    }

    self.loadContactList = function () {
      if (self.hasLocalStorage) {
        console.log ("Loading from local storage");
        var contactListJSON = localStorage.getItem ('contactList');

        if (contactListJSON != undefined) {
          var contacts = JSON.parse(contactListJSON);
          console.log (contacts);

          for (var i = 0; i < contacts.length; i++) {
            console.log (contacts[i]);
            self.allContacts.push ({
              contactName: contacts[i].contactName,
              observation: contacts[i].observation,
              telephones: contacts[i].telephones,
              addresses: contacts[i].addresses
            });
          }
        }

          console.log (self.allContacts);
      }
    }

    self.checkAndSubmit = function (contact) {
      var valid = true;

      if (valid) {
        self.addContact (contact);
        self.saveContactList ();
      } else {

      }
    }

    self.saveContactList = function () {
      if (self.hasLocalStorage) {
        console.log ("Saving to local storage: ");
        var contactListJSON = JSON.stringify (self.allContacts);
        console.log (contactListJSON);
        localStorage.setItem ('contactList', contactListJSON);
      }
    }

    self.eraseContactList = function () {
      if (self.hasLocalStorage) {
        console.log ("Apagando contatos");
        localStorage.removeItem ('contactList');
        self.allContacts.splice (0, self.allContacts.length);
      }
    }

    /* Phone functions */
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

    /* Address functions */
    self.searchAddress = function (index) {
      if (index >= 0 && index < $scope.contact.addresses.length) {

        let cep = $scope.contact.addresses[index].cep
        let searchUrl = 'http://api.postmon.com.br/v1/cep/' + cep;

        $http ({
          method: 'GET',
          url: searchUrl
        }).then (function successCallback (response) {
          var info = response.data;

          $scope.contact.addresses [index].location = info.logradouro + ', ' + info.bairro;
          $scope.contact.addresses [index].city = info.cidade;
          $scope.contact.addresses [index].uf = info.estado;
          printAddress (index, $scope.contact.addresses [index]);

        }, function errorCallback (response) {
          console.log ("ERROR with HTTP Request for CEP info");
          return {};
        });
      }
    }

    var printAddress = function (index, address) {
      console.log ("Endereço " + index + ": " + address.location + ", " + address.city + "/" + address.uf);
    }

    self.addAddress = function () {
      $scope.contact.addresses.push ({
        id: $scope.addressIDCount,
        cep: '',
        location: '',
        number: '',
        city: '',
        uf: ''
      });
      $scope.addressIDCount ++;

      if ($scope.addressIDCount >= 1000) {
        $scope.addressIDCount = 0;
      }
    }

    self.deleteAddress = function (index) {
      if (index >= 0 && index < $scope.contact.addresses.length) {
        $scope.contact.addresses.splice (index, 1);
      }
    }

    self.updateAddress = function (index, prop, value) {
      if (index >= 0 && index < $scope.contact.addresses.length) {
        $scope.contact.addresses [index][prop] = value;
      }
    }

}]);
