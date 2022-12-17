class CreateWeapons < ActiveRecord::Migration[7.0]
  def change
    create_table :weapons do |t|
      t.string :name
      t.integer :stars
      t.string :image_name
      t.string :image_path
      t.boolean :status
      t.string :note

      t.timestamps
    end
  end
end
