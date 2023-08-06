class CreateGiShoppings < ActiveRecord::Migration[7.0]
  def change
    create_table :gi_shoppings do |t|

      t.timestamps
    end
  end
end
