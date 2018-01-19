class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to '/locations'
    else
      redirect_to '/users/new'
    end
  end

  private

  def user_params
   params.permit(:username, :password)
  end

end
