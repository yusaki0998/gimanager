class GiAccountsController < ApplicationController
  before_action :set_gi_account, only: %i[ show edit update destroy ]

  # GET /gi_accounts or /gi_accounts.json
  def index
    @gi_accounts = GiAccount.all
  end

  # GET /gi_accounts/1 or /gi_accounts/1.json
  def show
  end

  # GET /gi_accounts/new
  def new
    @gi_account = GiAccount.new
  end

  # GET /gi_accounts/1/edit
  def edit
  end

  # POST /gi_accounts or /gi_accounts.json
  def create
    @gi_account = GiAccount.new(gi_account_params)

    respond_to do |format|
      if @gi_account.save
        format.html { redirect_to gi_account_url(@gi_account), notice: "Gi account was successfully created." }
        format.json { render :show, status: :created, location: @gi_account }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @gi_account.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /gi_accounts/1 or /gi_accounts/1.json
  def update
    respond_to do |format|
      if @gi_account.update(gi_account_params)
        format.html { redirect_to gi_account_url(@gi_account), notice: "Gi account was successfully updated." }
        format.json { render :show, status: :ok, location: @gi_account }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @gi_account.errors, status: :unprocessable_entity }
      end
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gi_account
      @gi_account = GiAccount.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def gi_account_params
      params.require(:gi_account).permit(:account_mail, :account_pass, :account_phone, :status, :note, :price, :owner)
    end
end
