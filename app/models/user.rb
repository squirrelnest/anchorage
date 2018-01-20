class User < ApplicationRecord

  has_many :reviews
  has_many :locations, through: :reviews

  validates :username, presence: true
  validates :username, uniqueness: true

  has_secure_password

end
