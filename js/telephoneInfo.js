application.component ('telephoneInfo', {
  template: `<p> Telefone {{ $ctrl.order }}: {{ $ctrl.telephone.number }} </p> <br>`,
  bindings: {
    telephone: '<',
    order: '<'
  }
});
