class Location < ApplicationRecord

  attr_writer :lon, :lat

  has_many :reviews, dependent: :destroy
  has_many :users, through: :reviews

  accepts_nested_attributes_for :reviews

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

  def to_geojson
    {
      id: id,
      nickname: nickname,
      type: "Feature",
      geometry: {
        coordinates: [ lon, lat ],
        type: "Point"
      }
    }
  end

end
