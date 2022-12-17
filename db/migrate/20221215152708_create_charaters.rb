class CreateCharaters < ActiveRecord::Migration[7.0]
  def change
    create_table :charaters do |t|
      t.string :name
      t.string :image_name
      t.string :image_path
      t.integer :start
      t.boolean :status
      t.string :note

      t.timestamps
    end
  end
end
