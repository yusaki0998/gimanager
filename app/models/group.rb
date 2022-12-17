class Group < ApplicationRecord
	has_many :users, dependent: :destroy
	has_many :departments, dependent: :destroy
	has_many :positions, dependent: :destroy

	def strip_whitespace
		self.name = self.name.strip unless self.name.nil?		
	end
end
