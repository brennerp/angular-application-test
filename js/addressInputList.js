function AddressInputListController () {
  const self = this;

  self.deleteAddress = function (index) {
    self.onDelete ( {index: index} );
  }

  self.updateAddress = function (index, prop, value) {
    console.log ('Passing through address list with index ' + index + ' and value ' + value);
    self.onUpdate ({ index: index, prop: prop, value: value });
  }

  self.addAddress = function () {
    self.onAdd ();
  }

  self.searchCEP = function (index) {
    self.onSearch ({ index: index });
  }
}

application.component ('addressInputList', {
  template: `<p>Endereços: <button type="button" ng-click="$ctrl.addAddress()"> + </button> <br>
   <address-input ng-repeat="address in $ctrl.addresses track by address.id" index="$index"
   address="address" on-delete="$ctrl.deleteAddress(index)" on-search="$ctrl.searchCEP(index)" on-update="$ctrl.updateAddress(index, prop, value)"> </address-input> <br> </p>`,
  controller: AddressInputListController,
  bindings: {
    addresses: '<',
    onAdd: '&',
    onDelete: '&',
    onUpdate: '&',
    onSearch: '&'
  }
})
