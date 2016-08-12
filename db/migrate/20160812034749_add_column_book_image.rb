require 'ffaker'
class AddColumnBookImage < ActiveRecord::Migration[5.0]
  def change
    add_column :books , :imageurl, :string, default: FFaker::Avatar.image
  end
end
