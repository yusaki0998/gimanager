class MenuTabBuilder < TabsOnRails::Tabs::Builder
  def open_tabs(options = {})
    @context.tag("ul", options, open = true)
  end

  def close_tabs(options = {})
    "</ul>".html_safe
  end

  def tab_for(tab, name, options, item_options = {})
    item_options[:class] = (current_tab?(tab) ? 'active' : '')
    @context.content_tag(:li, item_options) do
      @context.link_to(name, options)
    end
  end   
end
class DepartmentsController < ApplicationController
  set_tab :department

  before_action :authenticate_user!
  load_and_authorize_resource
  before_action :set_department, only: [:show, :edit, :update, :destroy]

  # GET /departments
  # GET /departments.json
  def index
      if current_user.group_id == 1
          @departments = Department.includes(:group).all
      else
          @departments = Department.includes(:group).where(group_id: current_user.group_id)
      end 
      
      if current_user.group_id == 1
          @positions = Position.includes(:group).all
      else 
          @positions = Position.includes(:group).where(group_id: current_user.group_id)
      end 
  end

  # GET /departments/1
  # GET /departments/1.json
  def show
  end

  # GET /departments/new
  def new
      @department = Department.new
  end

  # GET /departments/1/edit
  def edit
  end

  # POST /departments
  # POST /departments.json
  def create
      if current_user.group_id == 1
          @departments = Department.includes(:group).all
      else
          @departments = Department.includes(:group).where(group_id: current_user.group_id)
      end 

      @department = Department.new(department_params)
      @department.group_id = current_user.group_id
      
      respond_to do |format|
          if @department.save   
              flash.now[:notice] = t('departments.controller.added_department')
              format.html
              format.js
          else
              flash.now[:alert] = t('departments.controller.department_existed')
              format.js 
          end
      end
  end

  def update_department
      if params[:id].present?
          @department = Department.find(params[:id])
          respond_to do |format|
              format.js           
          end
      else
          format.js 
      end
  end 

  # PATCH/PUT /departments/1
  # PATCH/PUT /departments/1.json
  def update
      if current_user.group_id == 1
          @departments = Department.includes(:group).all
      else
          @departments = Department.includes(:group).where(group_id: current_user.group_id)
      end 
      
      
      respond_to do |format|
          if @department.update(department_params)
              flash.now[:notice] = t('departments.controller.updated_department')
              format.html 
              format.js
          else
              flash.now[:alert] = t('departments.controller.department_existed')     
              format.js
          end
      end
  end

  def delete_department       
      if params[:data].present?
          @departments = Department.find(params[:data][:ids])
          respond_to do |format|
              format.js
          end
      end
  end

  def delete_mul_departments
      if current_user.group_id == 1
          @departments = Department.includes(:group).all
      else
          @departments = Department.includes(:group).where(group_id: current_user.group_id)
      end 
      
      @departs = Department.where(id: params[:ids])
      check_exist = false
      @departs.each do |item|
          check_exist = true if UserDepartment.where(department_id: item.id).any?
      end
      
      if !check_exist
          @departs.destroy_all  
          flash.now[:notice] = t('departments.controller.deleted_department')     
      else
          flash.now[:alert] = t('departments.controller.fail_to_delete')     
      end    
      respond_to do |format|            
          format.html 
          format.js
      end
  end

  # DELETE /departments/1
  # DELETE /departments/1.json
  def destroy
      @department.destroy_all
      respond_to do |format|
          format.html { redirect_to departments_url }
          format.js
      end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_department
      @department = Department.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def department_params
      params.require(:department).permit(:name)
  end
end
