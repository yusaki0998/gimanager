class Charater < ApplicationRecord
    mount_uploader :image_path, CharaterImageUploader
end
