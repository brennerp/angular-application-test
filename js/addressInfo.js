application.component ('addressInfo', {
  template: `<p> Endereço {{ $ctrl.order }}: <br>
  {{$ctrl.address.location}}, {{$ctrl.address.number}} <br>
  {{$ctrl.address.city}}/{{$ctrl.address.uf}} <br>
  {{$ctrl.address.cep}} </p> <br>`,
  bindings: {
    address: '<',
    order: '<'
  }
});
