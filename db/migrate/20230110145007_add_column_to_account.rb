class AddColumnToAccount < ActiveRecord::Migration[7.0]
  def change
    add_column :gi_accounts, :birthday_acc, :string
    add_column :gi_accounts, :intertwined_fate, :integer
    add_column :gi_accounts, :acquaint_fate, :integer
    add_column :gi_accounts, :map_clear, :integer
    add_column :gi_accounts, :account_code, :string
  end
end
