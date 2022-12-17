class CreateGiAccountWeapons < ActiveRecord::Migration[7.0]
  def change
    create_table :gi_account_weapons do |t|
      t.integer :gi_account
      t.integer :weapon
      t.timestamps
    end
  end
end
