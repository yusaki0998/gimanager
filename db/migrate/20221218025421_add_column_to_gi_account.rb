class AddColumnToGiAccount < ActiveRecord::Migration[7.0]
  def change
    add_column :gi_accounts, :list_character, :string
    add_column :gi_accounts, :list_weapon, :string
  end
end
