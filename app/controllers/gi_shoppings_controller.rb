class GiShoppingsController < ApplicationController
  before_action :set_gi_shopping, only: %i[ show edit update destroy ]

  # GET /gi_shoppings or /gi_shoppings.json
  def index
    @gi_shoppings = GiShopping.all
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
end
