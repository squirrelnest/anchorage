class LocationsController < ApplicationController

  def index
    @locations = Location.all
  end

  def new
    @location = Location.new
  end

  def create
    @location = Location.create(location_params)
    redirect_to location_path(@location)
  end

  def show
    @location = Location.find(params[:id])
  end

  def edit
    @location = Location.find(params[:id])
  end

  def update
    if @user.admin
      @location = Location.find(params[:id])
      @location.update(location_params)
      @location.save
      redirect_to location_path(@location)
    else
      flash[:message] = "Only admins can do that."
      redirect_to location_path(@location)
    end
  end

  def destroy
    if @user.admin
      Location.find(params[:id]).destroy
      redirect_to locations_url
    else
      flash[:message] = "Only admins can do that."
      redirect_to locations_url
    end
  end

  private

  def location_params
    params.permit(:nickname, :lon, :lat)
  end

end
