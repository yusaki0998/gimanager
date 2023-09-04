class GiShoppingsController < ApplicationController
  skip_before_action :authenticate_user!
  # GET /gi_shoppings or /gi_shoppings.json
  def index
    @gi_shoppings = GiShopping.all
    @gi_accounts = GiAccount.all
    @charaters = Charater.all
    @weapons = Weapon.all
    @charaters_5_start = Charater.where(start: 5).limit(9)
    @other_characters_5_star = Charater.where(start: 5).where.not(id: @charaters_5_start.pluck(:id))

    @charaters_4_start = Charater.where(start: 4).limit(9)
    @other_characters_4_star = Charater.where(start: 4).where.not(id: @charaters_4_start.pluck(:id))

    @weapons_4_start = Weapon.where(stars: 4).limit(9)
    @other_weapons_4_start = Weapon.where(start: 4).where.not(id: @weapons_4_start.pluck(:id))
    
    @weapons_5_start = Weapon.where(stars: 5).limit(9)
    @other_weapons_5_start = Weapon.where(start: 5).where.not(id: @weapons_5_start.pluck(:id))
  end

  # GET /gi_shoppings/1 or /gi_shoppings/1.json
  def show
  end

  # GET /gi_shoppings/new
  def new
    @gi_shopping = GiShopping.new
  end

  # GET /gi_shoppings/1/edit
  def edit
  end

  # POST /gi_shoppings or /gi_shoppings.json
  def create
    @gi_shopping = GiShopping.new(gi_shopping_params)

    respond_to do |format|
      if @gi_shopping.save
        format.html { redirect_to gi_shopping_url(@gi_shopping), notice: "Gi shopping was successfully created." }
        format.json { render :show, status: :created, location: @gi_shopping }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @gi_shopping.errors, status: :unprocessable_entity }
      end
    end
  end

  def show_result_searching
    character_array = params[:character_array] if params[:character_array].present?
    weapon_array = params[:weapon_array] if params[:weapon_array].present?
    vien_hong = params[:vien_hong] if params[:vien_hong].present?
    vien_xanh = params[:vien_xanh] if params[:vien_xanh].present?
    ar_search = params[:ar_search] if params[:ar_search].present?
    @charaters = Charater.all
    @weapons = Weapon.all
    @gi_accounts = GiAccount.all
      if character_array.nil? && weapon_array.nil? && vien_hong.nil? && vien_xanh.nil?
        @gi_accounts =  nil
      else
        @filter_account = false
        if character_array.present?
          character_set = character_array.map(&:to_i).to_set
          @gi_accounts = @gi_accounts.select do |account|
            account_characters = account.list_character.split(',').map(&:to_i).to_set
            character_set.subset?(account_characters)
          end
          @filter_account = true
        end
        if weapon_array.present?
          weapon_set = weapon_array.map(&:to_i).to_set
          @gi_accounts = @gi_accounts.select do |account|
            account_weapon = account.list_weapon.split(',').map(&:to_i).to_set
            weapon_set.subset?(account_weapon)
          end
          @filter_account = true
        end
        if vien_hong.present?
          @gi_accounts = @gi_accounts.select do |account|
            account.intertwined_fate.to_i < vien_hong.to_i
          end
          @filter_account = true
        end
        if vien_xanh.present?
          @gi_accounts = @gi_accounts.select do |account|
            account.acquaint_fate.to_i < vien_xanh.to_i
          end
          @filter_account = true
        end
        if ar_search.present?
          @gi_accounts = @gi_accounts.where("ar < ?", ar_search.to_i)
          @filter_account = true
        end
      end
  end

  # PATCH/PUT /gi_shoppings/1 or /gi_shoppings/1.json
  def update
    respond_to do |format|
      if @gi_shopping.update(gi_shopping_params)
        format.html { redirect_to gi_shopping_url(@gi_shopping), notice: "Gi shopping was successfully updated." }
        format.json { render :show, status: :ok, location: @gi_shopping }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @gi_shopping.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /gi_shoppings/1 or /gi_shoppings/1.json
  def destroy
    @gi_shopping.destroy

    respond_to do |format|
      format.html { redirect_to gi_shoppings_url, notice: "Gi shopping was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gi_shopping
      @gi_shopping = GiShopping.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def gi_shopping_params
      params.fetch(:gi_shopping, {})
    end

    def check_satisfaction(input_array, reference_string)
      reference_array = reference_string.split(',').map(&:to_i)
      input_array.all? { |num| reference_array.include?(num) }
    end
end
