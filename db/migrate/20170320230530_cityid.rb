class Cityid < ActiveRecord::Migration[5.0]
  def change
    add_column(:cities, :api_code, :integer, null: false)
  end
end
