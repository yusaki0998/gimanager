class GiAccountsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  before_action :set_gi_account, only: %i[ show edit update destroy ]
  require 'csv'

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

  def import_new_list_acc
  end

  # def import_list_acc
  #   if params[:gi_account_file].present?
  #     @row_error = []
  #     @file_path = params[:gi_account_file][:file].path
  #     @error_code = 0
  #     # 1: sai dịnh dạng file, 2: sai dịnh dạng dữ liệu, 3: xuất hiện user chưa tồn tại
        
  #     begin
  #       gen_file = File.read(@file_path, encoding: 'UTF-16')
  #       @file = CSV.parse(gen_file.scrub)
  #       @file.delete_if {|(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o)| a == "account_mail"}
  #     rescue
  #       @is_error = true
  #       @error_code = 1
  #     end
  #     unless @is_error
  #       ids = []
  #       characters_hash = Charater.pluck(:name, :id).to_h
  #       weapons_hash = Weapon.select(:id, :name, :vi_weapon_name, :main_character).all
  #       weapons_by_name = {}
  #       weapons_hash.each do |weapon|
  #         weapons_by_name[weapon.name] = weapon.id
  #         weapons_by_name[weapon.vi_weapon_name] = weapon.id
  #         weapons_by_name[weapon.main_character] = weapon.id
  #       end
  #       if @file.length > 0
  #         @current_gi_account = @file.select{|(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o)| a == @file[0][0]}
  #         unless ids.include? @file[0][0]
  #           ids.push(@file[0][0])
  #           while @current_gi_account.length > 0
  #             begin
  #               @current_gi_account_row = @current_gi_account.select{|(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o)| b == @current_gi_account[0][1]}
  #               @gi_account = GiAccount.new
  #               @current_gi_account_row[0][0].present? ? @gi_account.account_mail = @current_gi_account_row[0][0] : @gi_account.account_mail = nil
  #               @current_gi_account_row[0][1].present? ? @gi_account.account_pass = @current_gi_account_row[0][1] : @gi_account.account_pass = nil
  #               @current_gi_account_row[0][2].present? ? @gi_account.account_phone = @current_gi_account_row[0][2] : @gi_account.account_phone = nil
  #               @current_gi_account_row[0][3].present? ? @gi_account.status = @current_gi_account_row[0][3] : @gi_account.status = nil
  #               @current_gi_account_row[0][4].present? ? @gi_account.note = @current_gi_account_row[0][4] : @gi_account.note = nil
  #               @current_gi_account_row[0][5].present? ? @gi_account.owner = @current_gi_account_row[0][5] : @gi_account.owner = nil
  #               @current_gi_account_row[0][8].present? ? @gi_account.birthday_acc = @current_gi_account_row[0][8] : @gi_account.birthday_acc = nil
  #               @current_gi_account_row[0][9].present? ? @gi_account.intertwined_fate = @current_gi_account_row[0][9] : @gi_account.intertwined_fate = nil
  #               @current_gi_account_row[0][10].present? ? @gi_account.acquaint_fate = @current_gi_account_row[0][10] : @gi_account.acquaint_fate = nil
  #               @current_gi_account_row[0][11].present? ? @gi_account.map_clear = @current_gi_account_row[0][11] : @gi_account.map_clear = nil
  #               @current_gi_account_row[0][12].present? ? @gi_account.account_code = @current_gi_account_row[0][12] : @gi_account.account_code = nil
  #               @current_gi_account_row[0][13].present? ? @gi_account.price = @current_gi_account_row[0][13] : @gi_account.price = nil
  #               @current_gi_account_row[0][14].present? ? @gi_account.sold_price = @current_gi_account_row[0][14] : @gi_account.sold_price = nil
  #               @current_gi_account_row[0][15].present? ? @gi_account.role = @current_gi_account_row[0][15] : @gi_account.role = nil
  #               ActiveRecord::Base.transaction do
  #                 while @current_gi_account_row.length > 0
  #                   if @current_gi_account_row[0][6].present?
  #                     character_names = @current_gi_account_row[0][6].split(',').map(&:strip)
  #                     matching_ids = []
  #                     character_names.each do |name|
  #                       character_id = characters_hash[name]
  #                       matching_ids << character_id if character_id
  #                     end
  #                     @gi_account.list_character = matching_ids.join(',')
  #                   else 
  #                     @gi_account.list_character = nil
  #                   end
  #                   if @current_gi_account_row[0][7].present?
  #                     weapon_names = @current_gi_account_row[0][7].split(',').map(&:strip)
  #                     matching_w_ids = []
  #                     weapon_names.each do |name|
  #                       weapon_id = weapons_by_name[name]
  #                       matching_w_ids << weapon_id if weapon_id
  #                     end
  #                     matching_ids.uniq!
  #                     @gi_account.list_weapon = matching_w_ids.join(',')
  #                   else
  #                     @gi_account.list_weapon = nil
  #                   end
  #                 end
  #               end
  #               @gi_account.save
  #             rescue
  #               @error_code = 2
  #             end
  #           end
  #           @file.delete_if {|(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o)| a == @current_gi_account_row[0][0]}
  #           if @error_code == 2
  #           end
  #         end
  #       end
  #     end
  #     # @error_gi_account = @row_error.map{|(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o)| i}.uniq
  #     # session[:error_gi_account] = @row_error
  #     # if @error_code == 1
  #     #   flash[:alert] = "Incorrect file format."
  #     #   redirect_to import_new_list_acc_path, :alert => 'Incorrect file format.' and return
  #     # elsif @error_code == 2
  #     #   flash[:alert] = "Incorrect file format count column."
  #     #   redirect_to import_new_list_acc_path, :alert => 'Incorrect file format count column.' and return
  #     # elsif @error_code == 3
  #     #   @row_error.each do |tmp_item|
  #     #     tmp_error_gi_account = TempErrorSchedule.new(item_0:tmp_item[0], item_1:tmp_item[1], item_2:tmp_item[2], item_3:tmp_item[3], item_4:tmp_item[4], item_5:tmp_item[5], item_6:tmp_item[6], item_7:tmp_item[7], item_8:tmp_item[8], item_9:tmp_item[9])
  #     #     tmp_error_gi_account.save
  #     #   end
  #     #   respond_to do |format|
  #     #     format.js
  #     #   end
  #     # else
  #     #   flash[:notice] = "スケジュールデータのCSVファイルからの読み込みが正常に完了しました。"
  #     #   redirect_to import_new_list_acc_path, :notice => 'スケジュールデータのCSVファイルからの読み込みが正常に完了しました。' and return
  #     # end
  #   end
  # end

  def import_list_acc
    if params[:gi_account_file].present?
      # Initialize variables for error handling
      @row_error = []
      @error_code = 0
      # Define error codes: 1 (incorrect file format), 2 (incorrect data format), 3 (user not found)

      begin
        # Read and parse the CSV file (assuming it's UTF-16 encoded)
        gen_file = File.read(params[:gi_account_file][:file].path, encoding: 'UTF-16')
        @file = CSV.parse(gen_file.scrub)
        
        # Remove the header row (account_mail, account_pass, ...)
        @file.shift
      rescue
        @is_error = true
        @error_code = 1
      end

      unless @is_error
        # Initialize an array to store processed IDs to prevent duplicates
        ids = []

        # Preload character and weapon data into memory
        characters_hash = Charater.pluck(:name, :id).to_h
        weapons_hash = Weapon.select(:id, :name, :vi_weapon_name, :main_character).all
        weapons_by_name = {}
        weapons_hash.each do |weapon|
          weapons_by_name[weapon.name] = weapon.id
          weapons_by_name[weapon.vi_weapon_name] = weapon.id
          weapons_by_name[weapon.main_character] = weapon.id
        end

        # Process each row in the CSV file
        @file.each do |row|
          begin
            account_mail, account_pass, account_phone, status, note, owner, list_character, list_weapon, birthday_acc, intertwined_fate, acquaint_fate, map_clear, account_code, price, sold_price, role = row
            account_mail, account_pass, user, ar, list_character, list_weapon, birthday_acc, intertwined_fate, acquaint_fate, map_clear, account_code, price, sold_price, role = row

            # Create a new GiAccount
            @gi_account = GiAccount.new(
              account_mail: account_mail,
              account_pass: account_pass,
              account_phone: user,
              ar: ar,
              birthday_acc: birthday_acc,
              note: note,
              owner: owner,
              intertwined_fate: intertwined_fate,
              acquaint_fate: acquaint_fate,
              map_clear: map_clear,
              account_code: account_code,
              price: price,
              sold_price: sold_price,
              role: role,
            )

            # Process character names and weapons
            if list_character.present?
              character_names = list_character.split(',').map(&:strip)
              matching_ids = character_names.map { |name| characters_hash[name] }.compact.uniq
              @gi_account.list_character = matching_ids.join(',')
            end

            if list_weapon.present?
              weapon_names = list_weapon.split(',').map(&:strip)
              matching_ids = weapon_names.map { |name| weapons_by_name[name] }.compact.uniq
              @gi_account.list_weapon = matching_ids.join(',')
            end

            # Save the GiAccount record
            ActiveRecord::Base.transaction do
              @gi_account.save!
            end

          rescue StandardError => e
            @error_code = 2
            @row_error << row
          end
        end
      end

      # Handle errors and flash messages as needed
      # ...
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

    def remove_space(str)
      return str.delete(", ").delete("　")
    end
end
