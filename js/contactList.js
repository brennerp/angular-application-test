angular.module ('application').component ('contactList', {
  template: `<div>
    <h2> Lista de {{ $ctrl.contacts.length }} contatos </h2>
    <contact-info ng-repeat="contact in $ctrl.contacts" contact="contact"> </contact-info>
  </div>`,
  bindings: {
    contacts: '<'
  }
});
