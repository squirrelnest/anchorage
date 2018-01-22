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
      flash[:message] = @user.errors.full_messages.join("/n") if @user.errors.any?
      redirect_to '/users/new'
    end
  end

  def reviews
    @reviews = @user.reviews
  end

  private

  def user_params
    params.permit(:username, :password)
  end

end
