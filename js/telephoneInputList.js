function TelephoneInputListController () {
  const self = this;

  self.deletePhone = function (index) {
    self.onDelete ( {index: index} );
  }

  self.updatePhone = function (index, value) {
    console.log ('Passing through list with index ' + index + ' and value ' + value);
    self.onUpdate ({ index: index, value: value })
  }

  self.addPhone = function () {
    self.onAdd ();
  }
}

application.component ('telephoneInputList', {
  template: `<p>Telefones: <button type="button" ng-click="$ctrl.addPhone()"> + </button> <br>
   <telephone-input ng-repeat="telephone in $ctrl.telephones track by telephone.id" index="$index"
   telephone="telephone" on-delete="$ctrl.deletePhone(index)" on-update="$ctrl.updatePhone(index, value)"></telephone-input> <br> </p>`,
  controller: TelephoneInputListController,
  bindings: {
    telephones: '<',
    onAdd: '&',
    onDelete: '&',
    onUpdate: '&'
  }
})
