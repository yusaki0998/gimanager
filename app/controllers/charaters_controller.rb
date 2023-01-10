class CharatersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_charater, only: %i[ show edit update destroy ]

  # GET /charaters or /charaters.json
  def index
    @charaters = Charater.all
  end

  # GET /charaters/1 or /charaters/1.json
  def show
  end

  # GET /charaters/new
  def new
    @charater = Charater.new
  end

  # GET /charaters/1/edit
  def edit
  end

  # POST /charaters or /charaters.json
  def create
    @charater = Charater.new(charater_params)
    @charaters = Charater.all
      if @charater.save
        render action: "index"
      end
  end

  # PATCH/PUT /charaters/1 or /charaters/1.json
  def update
    @charaters = Charater.all
    if @charater.update(charater_params)
      render action: "index"
    end
  end

  # DELETE /charaters/1 or /charaters/1.json
  def destroy
    @charater.destroy

    respond_to do |format|
      format.html { redirect_to charaters_url, notice: "Charater was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_charater
      @charater = Charater.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def charater_params
      params.require(:charater).permit(:name, :image_name, :image_path, :start, :status, :role, :note)
    end
end
