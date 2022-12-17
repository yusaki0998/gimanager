module ApplicationHelper
	def get_data_layout_color(isDark)
		isDark == true ? 'dark' : 'light'
	end

	def get_menu_bar()
		menu = nil
		# array_menu_schedule = ['week_schedule', 'group_day', 'personal_day', 'month_schedule', 'personal_year', 'show_schedule', 'new_schedule', 'edit']
		# case(controller_name)
		# when 'pdf'
		# 	if action_name == 'index' || action_name == 'share_with_me' || action_name == 'complete' || action_name == 'trash'
		# 		menu ='mn-stamp'		
		# 	end	
		# 	if action_name == 'modify'
		# 		menu ='mn-pdf-edit'		
		# 	end
		# when 'schedule_equipment'
		# 	 # if action_name == 'week_schedule' || action_name == 'group_day' || action_name == 'personal_day' || action_name == 'month_schedule'
		# 	if array_menu_schedule.include?(action_name)
		# 		menu ='mn-schedule'
		# 	end
		# when 'schedules'
		# 	if array_menu_schedule.include?(action_name)
		# 		menu ='mn-schedule'
		# 	end
		# else
		# 	menu = nil
		# end
		# menu
	end

	def format_locate(locate)
		case locate
		when 'vi'
			'Vietnamese'
		when 'ja'
			'Japanese'
		when 'en'
			'English'
		else
			''
		end			
	end


end
