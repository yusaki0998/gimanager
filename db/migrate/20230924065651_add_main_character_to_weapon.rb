class AddMainCharacterToWeapon < ActiveRecord::Migration[7.0]
  def change
    add_column :weapons, :main_character, :string
  end
end
