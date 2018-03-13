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
  <p> <input type="text" name="cep" ng-model="$ctrl.address.cep" ng-change="$ctrl.update('cep')" maxlength="10" placeholder="Insira seu CEP" /> <button type="button" ng-click="$ctrl.searchCEP()"> Busca </button> <br>
      <input type="text" name="location" readonly ng-model="$ctrl.address.location" ng-change="$ctrl.update('location')" placeholder="Logradouro" />
      <input type="text" name="number" ng-model="$ctrl.address.number" ng-change="$ctrl.update('number')" placeholder="Insira seu número" /> <br>
      <input type="text" name="city" readonly ng-model="$ctrl.address.city" ng-change="$ctrl.update('city')" placeholder="Cidade" />
      <input type="text" name="uf" readonly ng-model="$ctrl.address.uf" ng-change="$ctrl.update('uf')" placeholder="UF" /> <br>
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
