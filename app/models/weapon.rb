class Weapon < ApplicationRecord
    mount_uploader :image_path, WeaponImageUploader
end
