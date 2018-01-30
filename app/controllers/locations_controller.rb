class LocationsController < ApplicationController

  require 'net/http'

  def mapbox_token
    render json: ENV['MAPBOX_TOKEN'].to_json
  end

  def geojson
    @locations = Location.all
    render json: { locations: @locations.map(&:to_geojson) }
  end

  def get_country
    lon = params[:lon]
    lat = params[:lat]
    uri = URI("https://api.mapbox.com/geocoding/v5/mapbox.places/" + lon + "," + lat + ".json?types=country&access_token=#{ENV['MAPBOX_TOKEN']}")
    res = Net::HTTP.get_response(uri)
    render json: res.body
  end

  def index
    @locations = Location.all
  end

  def new
    @location = Location.new
    @review = Review.new
  end

  def create
    location_params = params.require(:location).permit(:nickname, :lon, :lat, :country, reviews_attributes: [:date_visited, :stability, :content]).to_hash
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
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @location, status: 200 }
    end
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
    params.require(:location).permit(:nickname, :lon, :lat, :country, reviews_attributes: [:date_visited, :stability, :content])
  end

end
