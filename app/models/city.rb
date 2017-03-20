class City < ApplicationRecord
  validates :min, :max, presence: {message: "You must input both a minimum and maximum desired temperature"}
  validates :name, presence: {message: "You must input a city name"}, uniqueness: {message: "You have already registered that city"}

  belongs_to :user
    foreign_key: :user_id,
    class_name: :User
end
