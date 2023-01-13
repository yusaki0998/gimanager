class ChangeTypeGiAccount < ActiveRecord::Migration[7.0]
  def change
    change_column :gi_accounts, :intertwined_fate, :text
    change_column :gi_accounts, :acquaint_fate, :text
    change_column :gi_accounts, :map_clear, :text
    add_column :gi_accounts, :sold_price, :integer
  end
end
