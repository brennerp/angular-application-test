function AddressInputController () {
  const self = this;

  self.$onInit = function () {
    self.inputIsValid = false;
  }

  self.delete = function () {
    self.onDelete ({ index: self.index });
  }

  self.update = function (prop) {
    self.onUpdate ({ index: self.index, prop: prop, value: self.address[prop]});
  }

  self.searchCEP = function () {
    self.onSearch ({ index: self.index });
  }
}

angular.module ('application').component ('addressInput', {
  template: `<p> Endereço {{ $ctrl.index + 1 }}: <button type="button" ng-click="$ctrl.delete()"> - </button> <br>
  <p> <input type="text" name="cep" ng-model="$ctrl.address.cep" ng-change="$ctrl.update('cep')" placeholder="Insira seu CEP" /> <button type="button" ng-click="$ctrl.searchCEP()"> s </button> <br>
      <input type="text" name="location" ng-model="$ctrl.address.location" ng-change="$ctrl.update('location')" placeholder="Insira o logradouro" />
      <input type="text" name="number" ng-model="$ctrl.address.number" ng-change="$ctrl.update('number')" placeholder="Insira o No" /> <br>
      <input type="text" name="city" ng-model="$ctrl.address.city" ng-change="$ctrl.update('city')" placehold="Insira a cidade" />
      <input type="text" name="uf" ng-model="$ctrl.address.uf" ng-change="$ctrl.update('uf')" placehold="Insira a UF" /> <br>
  </p> </p> <br>`,
  controller: AddressInputController,
  bindings: {
    address: '<',
    index: '<',
    onDelete: '&',
    onUpdate: '&',
    onSearch: '&'
  }
})
