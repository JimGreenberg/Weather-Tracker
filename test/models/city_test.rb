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
#

require 'test_helper'

class CityTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
