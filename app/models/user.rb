class User < ApplicationRecord

  has_many :reviews

  validates :username, presence: true
  has_secure_password

  def flagged?
    # flag user if self.status == "ahole" || self.status == "warned"
  end

end
