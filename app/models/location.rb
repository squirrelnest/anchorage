class Location < ApplicationRecord

  attr_writer :lon, :lat

  has_many :reviews, dependent: :destroy
  has_many :users, through: :reviews

  # accepts_nested_attributes_for :reviews

  validates :lonlat, uniqueness: true
  validates :lonlat, presence: true

  validate :lonlat_valid?, on: [:create, :update]

  def reviews_attributes=(reviews_attribute_sets=[])
    reviews_attribute_sets.each do |attribute_set|
      # #build calls Review.new() AND sets the foreign key (location_id) on the child object (review)
      self.reviews.build(attribute_set)
    end
  end

  def lonlat_valid?
    if lat.to_f < -90 || lat.to_f > 90 || lon.to_f < -180 || lon.to_f > 180
      errors.add(:lonlat, "latitude must be within -90 and 90, longitude must be within -180 and 180")
    end
  end

  def lat
    # returns instance value (ephemeral, in-memory value) if instance has already been created, else it returns the persisted value from the database
    # if there's neither instance value or persisted lonlat value, then return nil.
    # The code in parentheses is a nil guard: You can't call methods on nil. It's ok for lat to be nil. If you call lat, you get nil.
    # But if lonlat is nil, and you call lonlat.lat, it will throw an exception (undefined method 'lat' on Nil:NilClass) instead of returning nil.
    @lat ? @lat : (lonlat ? lonlat.lat : nil)
  end

  def lon
    @lon ? @lon : (lonlat ? lonlat.lon : nil)
  end

  def distance(location)
    lonlat.distance(location.lonlat)
  end

  def save
    factory = RGeo::Geographic.spherical_factory(srid: 4326)
    self.lonlat = factory.point(@lon, @lat)
    super
  end

  # Instance level method #nearby
  def nearby(distance)
    self.class.nearby(self.lat, self.lon, distance)
  end

  # Class level method #nearby
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
