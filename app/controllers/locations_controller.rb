class LocationsController < ApplicationController

  require 'net/http'

  def by_country
    @locations = Location.where(country: params[:country])
    render json: { locations: @locations.map {|location| LocationSerializer.new(location, :scope => current_user) } }
  end

  def mapbox_token
    render json: ENV['MAPBOX_MAP_TOKEN'].to_json
  end

  def geojson
    @locations = Location.all
    render json: { locations: @locations.map(&:to_geojson) }
  end

  def get_country
    lon = params[:lon]
    lat = params[:lat]
    uri = URI("https://api.mapbox.com/geocoding/v5/mapbox.places/" + lon + "," + lat + ".json?types=country&access_token=#{ENV['MAPBOX_GEOCODING_TOKEN']}")
    res = Net::HTTP.get_response(uri)
    render json: res.body
  end

  def index
    @location = Location.new
    @locations = Location.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @locations, status: 200 }
    end
  end

  def new
    @location = Location.find_by(id: params[:location_id])
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
      render json: @location, status: 201
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
