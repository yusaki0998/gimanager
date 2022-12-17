class Charater < ApplicationRecord
    mount_base64_uploader :image_path, CharaterImageUploader
end
