class User < ApplicationRecord

  has_many :reviews

  validates :username, presence: true
  validates :username, uniqueness: true

  has_secure_password

end
