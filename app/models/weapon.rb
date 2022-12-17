class Weapon < ApplicationRecord
    mount_base64_uploader :image_path, WeaponImageUploader
end
