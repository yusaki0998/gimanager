class CreateGiAccountCharaters < ActiveRecord::Migration[7.0]
  def change
    create_table :gi_account_charaters do |t|
      t.integer :gi_account
      t.integer :charater
      t.timestamps
    end
  end
end
