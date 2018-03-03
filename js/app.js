var application = angular.module ('application', []);


application.controller ('FormController', [
  function() {
    const self = this;

    self.allContacts = [];
    self.telephones = [];
    self.adresses = [];

    function Contact () {
      this.contactName = "";
      this.email = "";
      this.telephones = [];
      this.observation = "";
      this.adresses = [];
    }

    self.CreateContact = function () {
      var form = document.getElementById ('form');
      form.innerHTML += "<h1> Hello! </h1>";

      var nextContact = new Contact ();
      nextContact.contactName = self.contactName;
      nextContact.email = self.email;
      nextContact.telephones.push (self.telephone);
      nextContact.observation = self.observation;
      nextContact.adresses = self.adresses;
      self.allContacts.push (nextContact);


      form.innerHTML += "<h1> New contact phones: </h1> <br>";

      for (var i = 0; i < nextContact.telephones.length; i++) {
        form.innerHTML += "<h2>" + nextContact.telephones[i] + "</h2> <br>";
      }

    }

}]);
