function TelephoneInputController () {
  const self = this;

  self.$onInit = function () {
    self.value = self.telephone.number;
  }

  self.delete = function () {
    self.onDelete ({ index: self.index });
  }

  self.update = function () {
    console.log ('Updating telephone input!');
    self.onUpdate ({ index: self.index, value: self.value });
  }

  /*self.model = function () {
    return self.getModel (self.index);
  }*/
}

application.component ('telephoneInput', {
  template: `<p> Telefone {{ $ctrl.index + 1 }}: <input type="tel" ng-model="$ctrl.value" ng-change="$ctrl.update()" placeholder="Insira um telefone... "/>
  <button type="button" ng-click="$ctrl.delete()"> - </button> <br> </p>`,
  controller: TelephoneInputController,
  bindings: {
    telephone: '<',
    index: '<',
    onDelete: '&',
    onUpdate: '&'
  }
})
