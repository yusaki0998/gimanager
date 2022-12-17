class CreateGiAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :gi_accounts do |t|
      t.string :account_mail
      t.string :account_pass
      t.string :account_phone
      t.boolean :status
      t.string :note
      t.integer :price
      t.integer :owner

      t.timestamps
    end
  end
end
