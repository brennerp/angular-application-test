application.controller ('ListController', [ '$scope', ContactListController]);

function ContactListController ($scope) {
  var self = this;

  //self.$onInit = () => {
    self.contact = {
      contactName: "Insira seu nome",
      observation: "",
      email: "",
      telephones: [
        "3333 aaa aaaaa"
      ]
    };

    self.allContacts = [
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
  //}

  self.test = function () {
    document.getElementById('test').innerHTML += 'bbb' + self.allContacts.length + 'b';
  }

  self.addContact = function () {
      let newContact = angular.copy (self.contact);

      //let newContact = {
      //  contactName: "",
      //  observation: "",
      //  email: ""
    //  }

      //newContact.contactName = self.contact.contactName;
      //newContact.observation = self.contact.observation;
      //newContact.email = self.contact.email;
      //newcontact.telephones = [];
      //newcontact.telephones.push ('aaaaaaa');
      document.getElementById('test').innerHTML += newContact.contactName;
      self.allContacts.splice (0, 2, newContact);
      self.test();

  };
}

angular.module('application').component ('contactList', {
  template: `<div class="col-3">
    <h2> Lista de {{ $ctrl.allContacts.length }} contatos </h2>
    <contact-info ng-repeat="contact in $ctrl.allContacts" contact="contact" on-add="$ctrl.addContact"> </contact-info>
  </div>`,
  controller: ContactListController
});
