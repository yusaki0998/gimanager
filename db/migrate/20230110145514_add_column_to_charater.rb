class AddColumnToCharater < ActiveRecord::Migration[7.0]
  def change
    add_column :gi_accounts, :role, :integer
  end
end
