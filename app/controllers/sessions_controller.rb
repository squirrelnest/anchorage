class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by(username: params[:username])
    if @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to my_reviews_path
    else
      flash[:message] = "Invalid username/password combo"
      redirect_to login_path
    end
  end

  def destroy
    reset_session
    redirect_to locations_path
  end

  def fb_auth
    @user = User.find_or_create_by(username: auth['info']['name'], password_digest: auth['uid'])
    session[:user_id] = @user.id
    redirect_to my_reviews_path
  end

  private

  def auth
    request.env['omniauth.auth']
  end

end
