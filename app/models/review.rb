class Review < ApplicationRecord

  belongs_to :location
  belongs_to :user

  validates :stability, numericality: true

end
