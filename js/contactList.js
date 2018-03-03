function ContactListController () {
  const ctrl = this;

  ctrl.contactList = [
    {
      contactName: "Alberto",
      observation: "Filho do João",
      email: "alberto1992@fulano.com",
      telephones: [
        "aaaa aaa aaaaa",
        "bbb bbbbb bbbbb"
      ]
    },
    {
      contactName: "João",
      observation: "Amigo da Sandra",
      email: "joaorodrigo@fulano.com",
      telephones: [
        "ccc cccc cccccc",
        "ddd dddd ddddd"
      ]
    }
  ];

  ctrl.addContact = function (contact) {
    ctrl.contactList.push (angular.copy(contact));
  }
}

angular.module('application').component ("contactList", {
  templateUrl: 'contactList.html',
  controller: ContactListController
})
