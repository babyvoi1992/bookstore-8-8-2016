class CreateBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :content
      t.string :author

      t.timestamps
    end
  end
end
