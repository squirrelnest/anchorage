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
    @location = Location.find(params[:id])
    @location.update(location_params)
    @location.save
    redirect_to location_path(@location)
  end

  def destroy
    Location.find(params[:id]).destroy
    redirect_to locations_url
  end

  private

  def location_params
    params.permit(:name, :lon, :lat)
  end

end
