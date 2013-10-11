// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require turbolinks
//= require_tree .

l = [{
	name: "jose",
	phone: "09090",
	email: "adssad@asdsa.asd"
}]

App = Ember.Application.create()

App.Contact = Ember.Object.extend({
    name : "",
    email: "",
    phoneNumber: ""
});

App.Router.map(function(){
	this.resource("contacts");
	this.resource("home");
	this.resource("new");
});

App.ContactsRoute = Ember.Route.extend({
	model: function(){
		return l;
	}
});

App.NewRoute = Ember.Route.extend({
	model: function(){
      return App.Contact.create();
  	}

})

App.NewController = Ember.ObjectController.extend({
    submitAction : function(){
        // here you could perform your actions like persisting to the server or so
        alert("now we can submit the model:" + this.get("model.name"));
		$.post("/contacts/create", {
				"name" : this.get("model.name"),
				"email" : this.get("model.email"),
				"phone" : this.get("model.phoneNumber")
				}, 
				null, 
				"script"
			);
    }
});




