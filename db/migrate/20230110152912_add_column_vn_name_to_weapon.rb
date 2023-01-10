class AddColumnVnNameToWeapon < ActiveRecord::Migration[7.0]
  def change
    add_column :weapons, :vi_weapon_name, :string
  end
end
