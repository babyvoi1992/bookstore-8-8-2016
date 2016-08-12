require 'ffaker'
class AddImageColumnToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users , :imageurl, :string, default: Faker::Avatar.image
  end
end
