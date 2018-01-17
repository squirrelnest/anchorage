class Location < ApplicationRecord

  attr_reader :lonlat

  has_many :reviews

  def set_lonlat(lon, lat)
    factory = RGeo::Geographic.spherical_factory(srid: 4326)
    self.lonlat = factory.point(lon, lat)
    self.save
  end

  def nearby(latitude, longitude, distance)
    Location.where("ST_DWithin(locations.lonlat, ST_GeographyFromText('SRID=4326;POINT(:lon :lat)'), :distance)", lon: longitude, lat: latitude, distance: distance)
  end

end
