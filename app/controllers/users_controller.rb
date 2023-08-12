class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: %i[ show edit update destroy ]

  # GET /users or /users.json
  def index
    @users = User.all
  end

  # GET /users/1 or /users/1.json
  def show
  end

  # GET /users/new
  def new
    if current_user.group_id == 1
      @departments = Department.all
      @positions = Position.all
    else
      @departments = Department.where(group_id: current_user.group_id)
      @positions = Position.where(group_id: current_user.group_id)
    end 
    @group = Group.find(current_user.group_id)
    @user = User.new
    @user.user_departments.build
    @user.user_positions.build
  end

  def add_user
    if current_user.group_id == 1
      @departments = Department.all
      @positions = Position.all
    else
      @departments = Department.where(group_id: current_user.group_id)
      @positions = Position.where(group_id: current_user.group_id)
    end

    if current_user.group_id == 1
      @users = User.includes(:group, :user_departments, :departments,:user_positions, :positions).all
    else current_user.admin
      @users = User.includes(:group, :user_departments, :departments,:user_positions, :positions).where(group_id: current_user.group_id)
    end 
    @user = User.new(user_params) 
    @user.password_confirmation="123456"
    @user.password="123456"
    @user.status=0
    @user.group_id = current_user.group_id
    @user.skip_confirmation! 
    raw_token, hashed_token = Devise.token_generator.generate(User, :reset_password_token)
    @user.reset_password_token = hashed_token
    @user.reset_password_sent_at = Time.now.utc
    
    reset_password_token = @user.reset_password_token
    reset_password_url = root_url + Rails.application.routes.url_helpers.edit_user_password_path(reset_password_token: raw_token)    
    respond_to do |format|      
      if @user.save
        UserMailer.with(user: @user,current_user: current_user,reset_password_url: reset_password_url).new_user_email.deliver_later 
      #  @user.skip_confirmation! if ActiveModel::Type::Boolean.new.cast(@user.active)
        # @user.send_reset_password_instructions
        # UserMailer.registration_confirmation(@user).deliver
        flash.now[:notice] = 'ユーザーを追加できました。'
        format.html { redirect_to users_path, notice: 'ユーザーを追加できました。'}
        format.js
        # format.json { render :show, status: :created, location: @user, :layout => false}
      else
        format.js
        # format.html { redirect_to users_path, alert: 'ユーザーを追加できませんでした。'}
      end
    end
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to user_url(@user), notice: "User was successfully created." }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to user_url(@user), notice: "User was successfully updated." }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url, notice: "User was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def edit_avatar
    @department = Department.joins("INNER JOIN user_departments ON user_departments.department_id=departments.id").where("user_departments.user_id=?", current_user.id)
    @list_department = @department.map { |p| p.name }.join("\n")
    @position = Position.joins("INNER JOIN user_positions ON user_positions.position_id=positions.id").where("user_positions.user_id=?", current_user.id)     
    @list_position = @position.map { |p| p.name }.join("\n") 
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :employee_code, :admin, :active, :status, :password_default)
    end
end
