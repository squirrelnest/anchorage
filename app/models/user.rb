class User < ApplicationRecord

  has_many :reviews, dependent: :destroy
  has_many :locations, through: :reviews

  validates :username, presence: {message: "cannot be blank"}, allow_blank: false
  validates :username, uniqueness: {message: "must be unique"}

  has_secure_password

end
