class GiAccountsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_gi_account, only: %i[ show edit update destroy ]

  # GET /gi_accounts or /gi_accounts.json
  def index
    @gi_accounts = GiAccount.all
  end

  # GET /gi_accounts/1 or /gi_accounts/1.json
  def show
    @charaters = Charater.all
    @weapons = Weapon.all
  end

  # GET /gi_accounts/new
  def new
    @gi_account = GiAccount.new
    @charaters = Charater.all
    @weapons = Weapon.all
  end

  # GET /gi_accounts/1/edit
  def edit
    @charaters = Charater.all
    @weapons = Weapon.all
  end

  # POST /gi_accounts or /gi_accounts.json
  def create
    @gi_account = GiAccount.new(gi_account_params)
    @gi_accounts = GiAccount.all
      if @gi_account.save
        render action: "index"
      end
  end

  # PATCH/PUT /gi_accounts/1 or /gi_accounts/1.json
  def update
    @gi_accounts = GiAccount.all
      if @gi_account.update(gi_account_params)
        redirect_to gi_accounts_url
      end
  end

  # DELETE /gi_accounts/1 or /gi_accounts/1.json
  def destroy
    @gi_account.destroy
    respond_to do |format|
      format.html { redirect_to gi_accounts_url, notice: "Gi account was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def delete_accounts
    @accounts = GiAccount.where(id: params[:data][:ids])
    ActiveRecord::Base.transaction do
        @accounts.destroy_all  
    end
    respond_to do |format|            
      format.html 
      format.js
    end
    @gi_accounts = GiAccount.all
  end

  def import_list_acc
    if params[:gi_account_file].present?
      @row_error = []
      @file_path = params[:schedule_file][:file].path
      @error_code = 0
      # 1: sai dịnh dạng file, 2: sai dịnh dạng dữ liệu, 3: xuất hiện user chưa tồn tại
        
      begin
        # @file = CSV.read(@file_path, encoding: 'CP932', headers: true)
        gen_file = File.read(@file_path, encoding: 'UTF-16')
        @file = CSV.parse(gen_file.scrub)
      rescue
        @is_error = true
        @error_code = 1
      end
      unless @is_error
        hashes_char = Charater.where(group_id: current_user.group_id, active: true).select([:id, :firstname, :lastname]).map {|e| {id: e.id, firstname: (e[:firstname].to_s + e[:lastname].to_s).delete(" ")} }

        lst_char = []
        lst_weapon = []
        ids = []
        hashes_user.each do |user_in_group|
          lst_char.push(user_in_group.values) 
        end
        while @file.length > 0
          @current_schedule = @file.select{|(a,b,c,d,e,f,g,h,i,j)| a == @file[0][0]}
          unless ids.include? @file[0][0]
            ids.push(@file[0][0])
            while @current_schedule.length > 0
              begin
                @current_schedule_by_day = @current_schedule.select{|(a,b,c,d,e,f,g,h,i,j)| b == @current_schedule[0][1]}
                @schedule = Schedule.new()
                @schedule.date = @current_schedule_by_day[0][1]
                # @current_schedule_by_day[0][2].present? ? @schedule.time_start = (@current_schedule_by_day[0][1] + " " + @current_schedule_by_day[0][2]).to_datetime : @schedule.time_start = @current_schedule_by_day[0][1].to_datetime
                # @current_schedule_by_day[0][4].present? ? @schedule.time_end = (@current_schedule_by_day[0][3] + " " + @current_schedule_by_day[0][4]).to_datetime : @schedule.time_end = @current_schedule_by_day[0][3].to_datetime
                if @current_schedule_by_day[0][2].present?
                  @schedule.time_start_hour = @current_schedule_by_day[0][2].to_datetime.hour
                  @schedule.time_start_minutes = @current_schedule_by_day[0][2].to_datetime.minute
                else
                  @schedule.time_start_hour = nil
                  @schedule.time_start_minutes = nil
                end
                if @current_schedule_by_day[0][4].present?
                  @schedule.time_end_hour = @current_schedule_by_day[0][4].to_datetime.hour
                  @schedule.time_end_minutes = @current_schedule_by_day[0][4].to_datetime.minute
                else
                  @schedule.time_end_hour = nil
                  @schedule.time_end_minutes = nil
                end
                @schedule.company_info = ""
                if @current_schedule[0][1] == @current_schedule[0][3]
                  @schedule.type_schedule = 1
                elsif @current_schedule[0][1] != @current_schedule[0][3]
                  @schedule.type_schedule = 2
                end
                @type_meeting = TypeMeeting.find_by(name: @current_schedule[0][5], group_id: current_user.group_id)
                if @type_meeting.present?
                  @schedule.type_meeting = @type_meeting.id
                else 
                  if @current_schedule[0][5].present?
                    @type_meeting = TypeMeeting.new()
                    @type_meeting.name = @current_schedule[0][5]
                    @type_meeting.group_id = current_user.group_id
                    TypeMeeting.maximum('index').nil? ? @type_meeting.index = 1 : @type_meeting.index = TypeMeeting.maximum('index').next
                    ActiveRecord::Base.transaction do
                      @type_meeting.save
                      @schedule.type_meeting = @type_meeting.id
                    end
                  end
                end
                @schedule.title_type = @current_schedule[0][6]
                @schedule.note = @current_schedule[0][7]
                @schedule.is_public = true
                @schedule.user_created = current_user.id
                @schedule.user_updated = current_user.id
                @schedule.user_id = current_user.id
                ActiveRecord::Base.transaction do
                  if @schedule.type_schedule == 1
                    @schedule.set_time_schedule 
                  else
                    year_start = @current_schedule[0][1].split('/')[0]
                    month_start = @current_schedule[0][1].split('/')[1]
                    day_start = @current_schedule[0][1].split('/')[2]
                    year_end = @current_schedule[0][3].split('/')[0]
                    month_end = @current_schedule[0][3].split('/')[1]
                    day_end = @current_schedule[0][3].split('/')[2]
                    @schedule.time_start  = Time.new(year_start,month_start,day_start,@schedule.time_start_hour,@schedule.time_start_minutes,0,"+09:00")
                    if @schedule.time_end_hour.nil?
                      @schedule.time_end = Time.new(year_end, month_end, day_end ,@schedule.time_end_hour,@schedule.time_end_minutes,0,"+09:00").end_of_day
                    elsif @schedule.time_end_hour.to_i == 24 && @schedule.time_end_minutes.to_i == 0
                      @schedule.time_end = Time.new(year_end, month_end, day_end ,0,0,0,"+09:00").end_of_day
                    else
                      @schedule.time_end = Time.new(year_end, month_end, day_end ,@schedule.time_end_hour,@schedule.time_end_minutes,0,"+09:00")
                    end
                  end
                  @schedule.save
                  while @current_schedule_by_day.length > 0
                    if @current_schedule_by_day[0][8].present?
                      @lst_schedule_by_user = @current_schedule_by_day.select{|(a,b,c,d,e,f,g,h,i,j)| i == @current_schedule_by_day[0][8]}
                      # @user = User.find_by(group_id: current_user.group_id, name: @lst_schedule_by_user[0][8])
                      # if lst_char_by_name.include? remove_space(@lst_schedule_by_user[0][8])
                      user = lst_char.select {|e| e[1] == remove_space(@lst_schedule_by_user[0][8]) }
                      if user.present?
                        @new_schedule_user = ScheduleUser.new(schedule_id: @schedule.id, user_id: user[0][0])
                        @new_schedule_user.save
                      else
                        @error_code = 3
                        @row_error = @row_error + @file.select{|(a,b,c,d,e,f,g,h,i,j)| i == @current_schedule_by_day[0][8]}
                        @current_schedule.delete_if {|(a,b,c,d,e,f,g,h,i,j)| i == @current_schedule_by_day[0][8]}
                        @file.delete_if {|(a,b,c,d,e,f,g,h,i,j)| i == @current_schedule_by_day[0][8]}
                      end
                      @current_schedule = @current_schedule - @lst_schedule_by_user
                      @file = @file - @lst_schedule_by_user
                      @current_schedule_by_day.delete_if {|(a,b,c,d,e,f,g,h,i,j)| i == @current_schedule_by_day[0][8]}
                    else
                      @lst_schedule_by_equip = @current_schedule_by_day.select{|(a,b,c,d,e,f,g,h,i,j)| i.blank? }
                      @lst_schedule_by_equip.each do |e|
                        if e[9].present?
                          @equip = Equipment.find_by(name: e[9], group_id: current_user.group_id)
                          if @equip.blank?
                            @max_index = Equipment.where(group_id: current_user.group_id).maximum(:equipment_location)
                            @new_equip = Equipment.new(name: e[9], group_id: current_user.group_id, equipment_location: @max_index, category_id: 0)
                            @new_equip.save
                            @se = ScheduleEquipment.new(schedule_id: @schedule.id, equipment_id: @new_equip.id)
                          else
                            @se = ScheduleEquipment.new(schedule_id: @schedule.id, equipment_id: @equip.id)
                          end
                          @se.save
                        end
                        @arr_lst_schedule_by_equip = []
                        @arr_lst_schedule_by_equip.push(@lst_schedule_by_equip[0])
                        @current_schedule = @current_schedule - @arr_lst_schedule_by_equip
                        @file = @file - @arr_lst_schedule_by_equip
                      end
                      @current_schedule_by_day.delete_if {|(a,b,c,d,e,f,g,h,i,j)| i.blank? }
                    end
                  end
                  unless (ScheduleUser.exists?(schedule_id: @schedule.id) || ScheduleEquipment.exists?(schedule_id: @schedule.id))
                    raise ActiveRecord::Rollback
                  end
                end
              rescue
                @error_code = 2
                break
              end
            end
            if @error_code == 2
              break
            end
          end
        end
      end
      @error_schedule = @row_error.map{|(a,b,c,d,e,f,g,h,i,j)| i}.uniq
      # session[:error_schedule] = @row_error
      if @error_code == 1
        flash[:alert] = "Incorrect file format."
        redirect_to import_schedule_path, :alert => 'Incorrect file format.' and return
      elsif @error_code == 2
        flash[:alert] = "Incorrect file format count column."
        redirect_to import_schedule_path, :alert => 'Incorrect file format count column.' and return
      elsif @error_code == 3
        @row_error.each do |tmp_item|
          tmp_error_schedule = TempErrorSchedule.new(item_0:tmp_item[0], item_1:tmp_item[1], item_2:tmp_item[2], item_3:tmp_item[3], item_4:tmp_item[4], item_5:tmp_item[5], item_6:tmp_item[6], item_7:tmp_item[7], item_8:tmp_item[8], item_9:tmp_item[9])
          tmp_error_schedule.save
        end
        respond_to do |format|
          format.js
        end
      else
        flash[:notice] = "スケジュールデータのCSVファイルからの読み込みが正常に完了しました。"
        redirect_to import_schedule_path, :notice => 'スケジュールデータのCSVファイルからの読み込みが正常に完了しました。' and return
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gi_account
      @gi_account = GiAccount.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def gi_account_params
      params.require(:gi_account).permit(:account_mail, :account_pass, :account_phone, :status, :note, :price, :owner,:list_character,:list_weapon, :birthday_acc, :intertwined_fate, :acquaint_fate, :map_clear, :sold_price , :account_code, :ar, :role)
    end
end
