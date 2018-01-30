class LocationSerializer < ActiveModel::Serializer
  attributes :id, :nickname, :lonlat, :country, :lat, :lon
  has_many :reviews
end
