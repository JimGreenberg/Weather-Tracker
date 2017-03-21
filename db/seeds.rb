# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
City.destroy_all

john = User.create!(username: 'john_doe', password:'asdfasdf')
City.create!(name: 'Kiev', api_code: '703448', min: 50, max:70, user_id: john.id)
City.create!(name: 'Moscow', api_code: '524901', min: 45, max:70, user_id: john.id)
City.create!(name: 'London', api_code: '2643743', min: 30, max:90, user_id: john.id)
