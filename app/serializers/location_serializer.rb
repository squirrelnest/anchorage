class LocationSerializer < ActiveModel::Serializer
  attributes :id, :nickname, :lonlat, :country
  has_many :reviews
end
