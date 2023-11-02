class AddIMagePathToGiAccounts < ActiveRecord::Migration[7.0]
  def change
    add_column :gi_accounts, :image_path, :string
  end
end
