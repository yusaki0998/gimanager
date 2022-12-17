class AddColsToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :ic_no, :string
    add_column :users, :telephone, :string
    add_column :users, :is_full_time, :boolean
  end
end
