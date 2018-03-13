angular.module ('application').controller ('FormController', [ '$scope', '$http',
  function ($scope, $http) {
    const self = this;

    self.$onInit = function () {
      self.allContacts = [];
      $scope.telephoneIDCount = 0;
      $scope.addressIDCount = 0;

      $scope.contact = {};
      $scope.contact.contactName = '';
      $scope.contact.email = '';
      $scope.contact.observation = '';
      $scope.contact.telephones = [];
      $scope.contact.addresses = [];

      self.hasLocalStorage = self.supportsLocalStorage();
      self.loadContactList ();
    }

    /* Local storage detection */
    self.supportsLocalStorage = function () {
      return typeof(Storage) !== 'undefined';
    }

    /* List functions */
    self.addContact = function (contact) {
      var newContact = angular.copy (contact);
      self.allContacts.push (newContact);
    }

    self.loadContactList = function () {
      if (self.hasLocalStorage) {
        var contactListJSON = localStorage.getItem ('contactList');

        if (contactListJSON != undefined) {
          var contacts = JSON.parse(contactListJSON);

          for (var i = 0; i < contacts.length; i++) {
            self.allContacts.push ({
              contactName: contacts[i].contactName,
              email: contacts[i].email,
              observation: contacts[i].observation,
              telephones: contacts[i].telephones,
              addresses: contacts[i].addresses
            });
          }
        }
      }
    }

    self.saveContactList = function () {
      if (self.hasLocalStorage) {
        var contactListJSON = JSON.stringify (self.allContacts);
        localStorage.setItem ('contactList', contactListJSON);
      }
    }

    self.eraseContactList = function () {
      var response = confirm ('Tem certeza de que deseja apagar todos seus contatos?');
      if (response && self.hasLocalStorage) {
        localStorage.removeItem ('contactList');
        self.allContacts.splice (0, self.allContacts.length);
      }
    }

    /* Form functions */
    self.resetForm = function () {
      var response = confirm ('Deseja resetar o formulário?');
      if (response) {
        $scope.contact.contactName = '';
        $scope.contact.email = '';
        $scope.contact.observation = '';
        $scope.contact.telephones = [];
        $scope.contact.addresses = [];
      }
    }

    self.checkAndSubmit = function (contact) {
      var valid = true;

      if (self.contactNameIsValid(contact.contactName) &&
          self.emailIsValid(contact.email) &&
          self.telephonesAreValid (contact.telephones)) {

          self.addContact (contact);
          self.saveContactList ();
      }
    }

    self.contactNameIsValid = function (contactName) {
      if (contactName == undefined || contactName == '') {
        alert ('Nome de contato inválido. Tente novamente!');
        return false;
      }

      return true;
    }

    self.emailIsValid = function (email) {
      var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

      if (email == undefined || email == '' || !pattern.test(email)) {
        alert ('E-mail inválido. Tente novamente!');
        return false;
      } else if (self.alreadyHasEmail (email)) {
        alert ('E-mail já foi cadastrado. Tente outro!');
        return false;
      }

      return true;
    }

    self.alreadyHasEmail = function (email) {
      for (var i = 0; i < self.allContacts.length; i++) {
        if (email == self.allContacts[i].email) {
          return true;
        }
      }

      return false;
    }

    self.telephonesAreValid = function (telephones) {
        for (var i = 0; i < telephones.length; i++) {
          if (self.alreadyHasTelephone(telephones[i].number)) {
            alert ('Algum dos telefones já foi cadastrado. Tente outro');
            return false;
          }
        }

        return true;
    }

    self.alreadyHasTelephone = function (number) {
      for (var i = 0; i < self.allContacts.length; i++) {
        for (var j = 0; j < self.allContacts[i].telephones.length; j++) {
          if (number == self.allContacts[i].telephones[j].number) {
            return true;
          }
        }
      }

      return false;
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
