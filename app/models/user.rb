class User < ApplicationRecord

  has_many :reviews

  validates :username, presence: true
  validates :username, uniqueness: true

  has_secure_password

  def authenticate(password)
    salt = password_digest[0..28]
    hashed = BCrypt::Engine::hash_secret(password, salt)
    if (salt + hashed) == self.password_digest
      self
    else
      false
    end
  end

end
