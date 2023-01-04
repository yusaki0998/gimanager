class User < ApplicationRecord
	devise :database_authenticatable, :registerable,
			:recoverable, :rememberable, :trackable, :validatable, :confirmable, :timeoutable

	belongs_to :group
	validates_uniqueness_of :email, case_sensitive: true
	validates :email, :presence => {message: "メールを入力ください。"}
	validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

	has_many :user_departments, dependent: :destroy
	has_many :departments, :through => :user_departments, dependent: :restrict_with_exception
	accepts_nested_attributes_for :user_departments, reject_if: proc { |attributes| attributes['department_id'].blank? }

	has_many :user_positions, dependent: :destroy
	has_many :positions, :through => :user_positions
	accepts_nested_attributes_for :user_positions, reject_if: proc { |attributes| attributes['position_id'].blank? }, allow_destroy: true

	validate :ensure_employee_code_exists

	def ensure_employee_code_exists      
		@u = User.find_by(employee_code: self.employee_code,group_id: self.group_id)
		unless @u.nil?
			if @u.id != self.id
			  errors.add(:employee_code,'社員番号が存在しました。')
			end 
		end		
	end

	def fullname
		"#{self.first_name} #{self.last_name}"
	end
	
end
