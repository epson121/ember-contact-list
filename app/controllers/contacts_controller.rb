class ContactsController < ApplicationController
  def index
  	@contacts = ContactInfo.all
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @contacts }
      format.json { render :json => @contacts }
    end
  end

  def create
  	ContactInfo.create(name: params[:name], 
                       email: params[:email], 
                       phone: params[:phone])
  end

  def new
  end

  def edit
    @contact = ContactInfo.find(params[:id])
    respond_to do |format|
      format.json { render :json => @contact }
    end
  end

  def update
    ContactInfo.update(params[:id], name: params[:name], 
                                    email: params[:email], 
                                    phone: params[:phone])
  end

  def delete
    ContactInfo.delete(params[:id])
  end
end
