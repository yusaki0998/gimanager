class AddColumnRoleToCharater < ActiveRecord::Migration[7.0]
  def change
    add_column :charaters, :role, :integer
  end
end
