const application = angular.module ('application', []);

application.controller ('FormController', [ '$scope', '$http',
  function($scope, $http) {
    const self = this;

    self.$onInit = function () {
      $scope.telephoneIDCount = 0;
      $scope.addressIDCount = 0;

      $scope.contact = {};
      $scope.contact.contactName = '';
      $scope.contact.telephones = [];
      $scope.contact.addresses = [];

      self.allContacts = [
        {
          contactName: "Alberto",
          observation: "Filho do João",
          email: "alberto1992@fulano.com",
          telephones: [
            { number: "aaaa aaa aaaaa" },
            { number: "bbb bbbbb bbbbb" }
          ],
          addresses: [
            { cep: "31829-810", number: "470 Ap201" }
          ]
        },
        {
          contactName: "João",
          observation: "Amigo da Sandra",
          email: "joaorodrigo@fulano.com",
          telephones: [
            { number: "ccc cccc cccccc" },
            { number: "ddd dddd ddddd" }
          ],
          addresses: [
            { cep: "32419-512", number: "106" },
            { cep: "32629-782", number: "510 Ap201" }
          ]
        }
      ];
    }

    self.addContact = function (contact) {
      console.log ("Telephones: " + contact.telephones.length);
      var newContact = angular.copy (contact);
      for (var telephone in contact.telephones) {
        console.log (telephone.number);
      }
      self.allContacts.push (newContact);
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
