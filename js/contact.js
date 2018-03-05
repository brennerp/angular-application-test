application.component('contactInfo', {
  template: `<div class="contact col-1">
    <h3> {{ $ctrl.contact.contactName }} </h3> <br>
    <h4> {{ $ctrl.contact.observation }} </h4> <br>
    <p> {{ $ctrl.contact.email }} </p> <br>
    <telephone-info ng-repeat="telephone in $ctrl.contact.telephones" telephone="telephone" order="($index + 1)"> </telephone-info>
    <p> Endereço...</p> <br>
  </div>`,
  bindings: {
    contact: '<'
  }
});
