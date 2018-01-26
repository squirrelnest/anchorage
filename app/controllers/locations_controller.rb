class LocationsController < ApplicationController

  def index
    @locations = Location.all
    @geojson = 'https://api.mapbox.com/datasets/v1/zerkonium/cjcv56iq008bh2yo5f7ar1m5a/features/f61212a1a542107f76bab47c2c6e18a8?access_token=pk.eyJ1IjoiemVya29uaXVtIiwiYSI6ImNqY2NrY281dzAxeXUyeHBnZWo5a2t3YXkifQ.KeqRj11iwks2f6HVBvB3_Q'
  end

  def new
    @location = Location.new
    @review = Review.new
  end

  def geojson
    @locations = Location.all
    render json: {locations: @locations.map(&:to_geojson) }
  end

  def create
    location_params = params.require(:location).permit(:nickname, :lon, :lat, reviews_attributes: [:date_visited, :stability, :content]).to_hash
    location_params["reviews_attributes"][0]["user_id"] = current_user.id
    @location = Location.create(location_params)
    if @location.errors.any?
      flash[:message] = @location.errors.full_messages.join("\n")
      redirect_to new_location_path
    else
      redirect_to location_path(@location)
    end
  end

  def show
    @location = Location.find(params[:id])
  end

  def edit
    @location = Location.find(params[:id])
  end

  def update
    if current_user.admin
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
    if current_user.admin
      Location.find(params[:id]).destroy
      redirect_to locations_url
    else
      flash[:message] = "Only admins can do that."
      redirect_to locations_url
    end
  end

  def nearby
    @current_lon = cookies[:lon].to_f
    @current_lat = cookies[:lat].to_f
    distance = 10000
    @locations = Location.nearby(@current_lat, @current_lon, distance)
  end

  private

  def location_params
    params.require(:location).permit(:nickname, :lon, :lat, reviews_attributes: [:date_visited, :stability, :content])
  end

end
