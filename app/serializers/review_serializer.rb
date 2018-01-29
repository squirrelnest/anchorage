class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :stability, :date_visited
end
