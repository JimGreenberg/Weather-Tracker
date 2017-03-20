# == Schema Information
#
# Table name: cities
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  name       :string           not null
#  min        :integer          not null
#  max        :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  api_code   :integer          not null
#

class City < ApplicationRecord
  validates :min, :max, presence: {message: "You must input both a minimum and maximum desired temperature"}
  validates :name, presence: {message: "You must input a city name"}, uniqueness: {message: "You have already registered that city"}

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User
end
