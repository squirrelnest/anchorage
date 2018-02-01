class LocationsController < ApplicationController

  def geojson
    @locations = Location.all
    render json: { locations: @locations.map(&:to_geojson) }
  end

  def index
    @locations = Location.all
  end

  def new
    @location = Location.new
    @review = Review.new
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
    @review = Review.new
  end

  def edit
    @location = Location.find(params[:id])
  end

  def update
    if current_user.admin
      @location = Location.find(params[:id])
      if @location.update(location_params)
        redirect_to location_path(@location)
      else
        flash[:message] = "Latitude must be between -90 and 90. Longitude must be between -180 and 180."
        redirect_to location_path(@location)
      end
    else
      flash[:message] = "Only admins can edit location."
      redirect_to location_path(@location)
    end
  end

  def destroy
    if current_user.admin
      Location.find(params[:id]).destroy
      redirect_to locations_url
    else
      flash[:message] = "Only admins can destroy locations."
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
