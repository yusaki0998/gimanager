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
