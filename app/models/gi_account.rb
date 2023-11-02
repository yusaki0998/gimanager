class GiAccount < ApplicationRecord
    mount_uploader :image_path, GiAccountImageUploader
end
