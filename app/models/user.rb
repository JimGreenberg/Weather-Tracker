# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord

  has_many :cities,
    foreign_key: :user_id,
    class_name: :City

  ###AUTH###
  before_validation :ensure_session_token
  validates :username, uniqueness: {message: 'That username is taken, please try another'}, presence: {message: "You need to enter a username"}
  validates :password, length: {minimum: 6, allow_nil: true, message: "Enter a password at least 6 characters long"}
  validates :password_digest, presence: true

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil unless !!user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = new_session_token
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def new_session_token
    SecureRandom.base64
  end
end
