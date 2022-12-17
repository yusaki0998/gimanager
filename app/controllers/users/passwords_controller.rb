# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  before_action :authenticate_user!
  respond_to :json, only: [:create, :update]
  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
  def create
    @user = User.send_reset_password_instructions(params[:user])
      if successfully_sent?(@user)
          redirect_to confirm_mail_registration_path(:id=>@user)
      else
      respond_to do |format|
          format.js
      end
    end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

  # PUT /resource/password
  def update
    self.resource = resource_class.reset_password_by_token(resource_params)       
    self.resource.status=1;
    yield resource if block_given?
    if resource.errors.empty?
      self.resource.save 
      self.resource.skip_confirmation!
      if Devise.sign_in_after_reset_password
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        set_flash_message(:notice, flash_message) if is_flashing_format?
        sign_in(resource_name, resource)
      else
        set_flash_message(:notice, :updated_not_active) if is_flashing_format?
      end
      respond_with resource, location: new_user_session_path
    else
      respond_to do |format|
        format.js
      end
    end
  end

  def resource_params
    params.require(:user).permit(:email,:reset_password_token, :password, :password_confirmation)
  end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end
