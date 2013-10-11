class ContactsController < ApplicationController
  def index
  	@contacts = ContactInfo.all
  end

  def create
  	ContactInfo.create(name: params[:name], email: params[:email], phone: params[:phone])
  	redirect_to "contacts/index"
  end

  def new
  end

  def edit
  end
end
