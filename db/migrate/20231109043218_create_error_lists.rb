class CreateErrorLists < ActiveRecord::Migration[7.0]
  def change
    create_table :error_lists do |t|
      t.string :item_0
      t.string :item_1
      t.string :item_2
      t.string :item_3
      t.string :item_4
      t.string :item_5
      t.string :item_6
      t.string :item_7
      t.string :item_8
      t.string :item_9
      t.string :item_10
      t.string :item_11
      t.string :item_12
      t.string :item_13
      t.string :item_14
      t.string :item_15

      t.timestamps
    end
  end
end
