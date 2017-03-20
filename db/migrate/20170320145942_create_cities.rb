class CreateCities < ActiveRecord::Migration[5.0]
  def change
    create_table :cities do |t|
      t.user_id :integer, null: false
      t.name :string, null: false
      t.min :integer, null: false
      t.max :integer, null: false
      t.timestamps
    end
    add_index :cities, [:user_id, :name], unique: true
  end
end
