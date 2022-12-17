class Position < ApplicationRecord
  has_many :user_positions, dependent: :destroy
  has_many :users, :through => :user_positions, dependent: :destroy
  belongs_to :group
  before_validation :strip_whitespace
  validate :ensure_position_exists

  def ensure_position_exists      
    @u = Position.find_by(name: self.name,group_id: self.group_id)
    unless @u.nil?
      if @u.id != self.id
        errors.add(:name,'役職が存在しました。')
      end 
    end 
  end
  def strip_whitespace
    self.name = self.name.strip unless self.name.nil?   
  end
end
