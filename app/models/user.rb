class User < ApplicationRecord

  has_many :reviews
  has_many :locations, through: :reviews

  validates :username, presence: true, allow_blank: false
  validates :username, uniqueness: {message: "must be unique."}

  validates :password, presence: true, allow_blank: false

  has_secure_password

end
