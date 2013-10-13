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


//Create appliaction
App = Ember.Application.create({
	LOG_TRANSITIONS: true
})

// Contact object
App.Contact = Ember.Object.extend({
    name : "",
    email: "",
    phoneNumber: ""
});

//routes
App.Router.map(function(){
	this.resource("contacts")
	this.resource("edit", {'path' : "contacts/:contact_id"});
	this.resource("delete", {"path" : "contacts/delete/:contact_id"})
	this.resource("home");
	this.resource("new");
});

// redirect index to contacts
App.IndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('contacts');
    }
});

// get contacts from database via rails api
App.ContactsRoute = Ember.Route.extend({
	model : function() {
		return $.getJSON('/contacts/index.json');
	}
});

//get specific user from database via rails api
App.EditRoute = Ember.Route.extend({
	model : function(params) {
		return $.getJSON("/contacts/" + params.contact_id + "/edit.json")
	},
});

// submit changes to database (rails api)
App.EditController = Ember.ObjectController.extend({
	submitAction : function(){
		$.post("/contacts/update", {
				"id" : this.get("model.id"),
				"name" : this.get("model.name"),
				"email" : this.get("model.email"),
				"phone" : this.get("model.phone")
				}, 
				function() {
		        	window.location.href = "/"
			    }
		);
	}
})

// get entry for deletion
App.DeleteRoute = Ember.Route.extend({
	model : function(params) {
		return $.getJSON("/contacts/" + params.contact_id + "/edit.json")
	}
})

// delete entry (action delete)
App.DeleteController = Ember.ObjectController.extend({

  actions: {
  	//use url (could not get the id otherwise ) ...
    delete: function(params) {
    	ids = window.location.href.split("/");
    	id = ids[ids.length-1];
    	$.post("/contacts/delete", {
				"id" : id
				}, 
				function() {
		        	window.location.href = "/"
			    }
		);
	},

    dont: function() {
      this.transitionTo('contacts');
    }
  }
});


// new contact
App.NewRoute = Ember.Route.extend({
	model: function(){
      return App.Contact.create();
  	}
})

// add new contact to database and go to the homepage
App.NewController = Ember.ObjectController.extend({
    submitAction : function(){
        // here you could perform your actions like persisting to the server or so
		$.post("/contacts/create", {
				"name" : this.get("model.name"),
				"email" : this.get("model.email"),
				"phone" : this.get("model.phone")
				}, 
				function() {
		        	window.location.href = "/"
			    }
			);
    }
});




