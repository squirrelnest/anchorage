class SessionsController < ApplicationController

  def new
  end

  def create
    session[:username] = params[:username]
    session[:username].nil? || session[:username] == ''  ? (redirect_to '/login') : (redirect_to '/')
  end

  def destroy
    session.delete :username
  end

end
