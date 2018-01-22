class Location < ApplicationRecord

  # ActiveRecord makes an attr_accessor for every single column in the model's database table
  # Instance variables only live in memory. The object they represent can only live beyond the instance variable if the object is saved/persisted to the db
  # An instance variable, is a variable unique to a specific instance of an object that may or may not have been persisted to the database yet.
  # If the data hasn't been persisted yet, the instance of an object (qua the object in memory) may not have the same as attributes as the row/record it represents in the database.
  # An object is a specific instance of a class.
  # Objects don't get saved to the db. Only their attributes get saved to the db so you can recreate the object later.
  # Columns are cheap

  attr_writer :lon, :lat

  has_many :reviews
  has_many :users, through: :reviews

  validates :lonlat, uniqueness: true
  validates :lonlat, presence: true

  validate :lonlat_valid?, on: :create

  def lonlat_valid?
    if @lat.to_f < -90 || @lat.to_f > 90 || @lon.to_f < -180 || @lon.to_f > 180
      errors.add(:lonlat, "latitude must be within -90 and 90, longitude must be within -180 and 180")
    end
  end

  def lat
    lonlat ? lonlat.lat : @lat
  end

  def lon
    lonlat ? lonlat.lon : @lon
  end

  def distance(location)
    lonlat.distance(location.lonlat)
  end

  def save
    factory = RGeo::Geographic.spherical_factory(srid: 4326)
    self.lonlat = factory.point(@lon, @lat)
    super
  end

  def nearby(distance)
    self.class.nearby(self.lat, self.lon, distance)
  end

  def self.nearby(lat, lon, distance)
    Location.where("ST_DWithin(locations.lonlat, ST_GeographyFromText('SRID=4326;POINT(:lon :lat)'), :distance)", lon: lon, lat: lat, distance: distance)
  end

end
