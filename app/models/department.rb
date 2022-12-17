class Department < ApplicationRecord
  has_many :user_departments, dependent: :destroy
  has_many :users, through: :user_departments
  belongs_to :group
  before_validation :strip_whitespace
  validate :ensure_department_exists

  def ensure_department_exists      
    @u = Department.find_by(name: self.name,group_id: self.group_id)
    unless @u.nil?
      if @u.id != self.id
        errors.add(:name,'部署が存在しました。')
      end 
    end 
  end
  def strip_whitespace
    self.name = self.name.strip unless self.name.nil?   
  end
end
