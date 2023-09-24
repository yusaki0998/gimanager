class WeaponsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_weapon, only: %i[ show edit update destroy ]

  # GET /weapons or /weapons.json
  def index
    @weapons = Weapon.all
  end

  # GET /weapons/1 or /weapons/1.json
  def show
  end

  # GET /weapons/new
  def new
    @weapon = Weapon.new
  end

  # GET /weapons/1/edit
  def edit
  end

  # POST /weapons or /weapons.json
  def create
    @weapon = Weapon.new(weapon_params)
    @weapons = Weapon.all
      if @weapon.save
        render action: "index"
      end
  end

  # PATCH/PUT /weapons/1 or /weapons/1.json
  def update
    @weapons = Weapon.all
    if @weapon.update(weapon_params)
      render action: "index"
    end
  end

  # DELETE /weapons/1 or /weapons/1.json
  def destroy
    @weapon.destroy

    respond_to do |format|
      format.html { redirect_to weapons_url, notice: "Weapon was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_weapon
      @weapon = Weapon.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def weapon_params
      params.require(:weapon).permit(:name, :stars, :image_name, :image_path, :status, :note, :vi_weapon_name, :main_character)
    end
end
