function TelephoneInputController () {
  const self = this;

  self.delete = function () {
    self.onDelete ({ index: self.index });
  }

  self.update = function () {
    self.onUpdate ({ index: self.index, value: self.telephone.number });
  }
}

angular.module ('application').component ('telephoneInput', {
  template: `<p> Telefone {{ $ctrl.index + 1 }}: <input type="tel" ng-model="$ctrl.telephone.number" ng-change="$ctrl.update()" maxlength="20" placeholder="Insira um telefone... "/>
  <button type="button" ng-click="$ctrl.delete()"> - </button> <br> </p>`,
  controller: TelephoneInputController,
  bindings: {
    telephone: '<',
    index: '<',
    onDelete: '&',
    onUpdate: '&'
  }
})
