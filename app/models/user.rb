class User < ApplicationRecord
	devise :database_authenticatable, :registerable,
			:recoverable, :rememberable, :trackable, :validatable, :timeoutable
	validates_uniqueness_of :email, case_sensitive: true
	validates :email, :presence => {message: "メールを入力ください。"}
	validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

	has_many :user_departments, dependent: :destroy
	has_many :departments, :through => :user_departments, dependent: :restrict_with_exception
	accepts_nested_attributes_for :user_departments, reject_if: proc { |attributes| attributes['department_id'].blank? }

	has_many :user_positions, dependent: :destroy
	has_many :positions, :through => :user_positions
	accepts_nested_attributes_for :user_positions, reject_if: proc { |attributes| attributes['position_id'].blank? }, allow_destroy: true
	def fullname
		"#{self.first_name} #{self.last_name}"
	end
	
end
