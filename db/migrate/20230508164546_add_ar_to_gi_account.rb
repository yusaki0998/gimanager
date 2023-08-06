class AddArToGiAccount < ActiveRecord::Migration[7.0]
  def change
    add_column :gi_accounts, :ar, :integer
  end
end
