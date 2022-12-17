class MenuTabBuilder < TabsOnRails::Tabs::Builder
  def open_tabs(options = {})
    options[:class] ||= "nav navbar-nav"
    @context.tag("ul", options, open = true)
  end

  def close_tabs(options = {})
    "</ul>".html_safe
  end

  def tab_for(tab, name, options, item_options = {})
    li_options = {}
    li_options[:class] = "#{li_options[:class]} nav-item"
    if current_tab?(tab)
      li_options[:class] << " active"
    end

    item_options[:class] = "#{item_options[:class]} nav-link"

    @context.content_tag(:li, li_options) do
      @context.link_to(name, options, item_options)
    end
  end
end
class PositionsController < ApplicationController
  load_and_authorize_resource
  set_tab :position
  before_action :authenticate_user!
  before_action :set_position, only: [:show, :edit, :update, :destroy]

  # GET /positions
  # GET /positions.json
  def index
    if current_user.group_id == 1
        @departments = Department.includes(:group).all
    else
        @departments = Department.includes(:group).where(group_id: current_user.group_id)
    end 
    
    if current_user.group_id == 1
        @positions = Position.includes(:group).all
    else current_user.admin
        @positions = Position.includes(:group).where(group_id: current_user.group_id)
    end 
end

  # GET /positions/1
  # GET /positions/1.json
  def show
  end

  # GET /positions/new
  def new
    @position = Position.new
  end

  # GET /positions/1/edit
  def edit
  end

  # POST /positions
  # POST /positions.json
  def create     
    if current_user.group_id == 1
        @positions = Position.includes(:group).all
    else current_user.admin
        @positions = Position.includes(:group).where(group_id: current_user.group_id)
    end 
    
    @position = Position.new(position_params)
    @position.group_id = current_user.group_id
    respond_to do |format|
        if @position.save
            flash.now[:notice] = t('positions.controller.updated_position')     
            format.html { redirect_to positions_path, notice: t('positions.controller.created_position') }
            format.js
        else
            flash.now[:alert] = t('positions.controller.position_existed')
            format.html { render :new }
            format.js
        end
    end
  end

  def update_position
    if params[:id].present?
        @position = Position.find(params[:id])
        respond_to do |format|
            format.js
        end
    end
  end

    # PATCH/PUT /positions/1
    # PATCH/PUT /positions/1.json
    def update
    if current_user.group_id == 1
        @positions = Position.includes(:group).all
    else current_user.admin
        @positions = Position.includes(:group).where(group_id: current_user.group_id)
    end 

      
        respond_to do |format|
            if @position.update(position_params)
                flash.now[:notice] = t('positions.controller.updated_position')  
                format.html { redirect_to position_url(@position.id) }
                format.js
            else
                flash.now[:alert] = t('positions.controller.position_existed')
                format.js
            end
        end
    end

  def delete_positions      
    if params[:data].present?
        @positions = Position.where(id: params[:data][:ids])
        respond_to do |format|
            format.js
        end
    end
  end

  def sub_delete_positions 
    if current_user.group_id == 1
      @positions = Position.includes(:group).all
    else current_user.admin
        @positions = Position.includes(:group).where(group_id: current_user.group_id)
    end 

    check_exist = false
    @posis = Position.where(id: params[:ids])
    @posis.each do |item|
        check_exist = true if UserPosition.where(position_id: item.id).any?
    end
    
    if !check_exist
        @posis.destroy_all  
        flash.now[:notice] = t('positions.controller.deleted_position')
    else
        flash.now[:alert] = t('positions.controller.delete_failed')
    end    
    respond_to do |format|            
        format.html 
        format.js
    end



  end

  # DELETE /positions/1
  # DELETE /positions/1.json
  def destroy
    @position.destroy
    respond_to do |format|
      format.html { redirect_to positions_url, notice: t('positions.controller.deleted_position') }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_position
      @position = Position.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def position_params
      params.require(:position).permit(:name)
    end
end
