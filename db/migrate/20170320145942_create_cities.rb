class CreateCities < ActiveRecord::Migration[5.0]
  def change
    create_table :cities do |t|
      t.integer :user_id, null: false
      t.string :name, null: false
      t.integer :min, null: false
      t.integer :max, null: false
      t.timestamps
    end
    add_index :cities, [:user_id, :name], unique: true
  end
end
