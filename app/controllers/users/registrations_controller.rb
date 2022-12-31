# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  def new
    super
  end

  def confirm_mail
    @user = User.find(params[:id])
  end

  def logout
  end

  # POST /resource
  def create
    build_resource(sign_up_params)  
    resource.admin = 1
    resource.active = 0
    resource.status = 1
    if User.maximum(:employee_code).nil?
      resource.employee_code = "1".rjust(6,"0")
    else
      code = User.maximum(:employee_code).to_i.next
      resource.employee_code = code.to_s.rjust(6,"0")
    end
    
    @group = Group.new
    @group.name = 'Admin'            
    @group.save
    resource.group_id = @group.id

    ActiveRecord::Base.transaction do
      if resource.save
        # this block will be used when user is saved in database
        if resource.active_for_authentication?
          # this block will be used when user is active or not required to be confirmed
          set_flash_message :notice, :signed_up if is_navigational_format?
          sign_up(resource_name, resource)
          respond_with resource, :location => after_sign_up_path_for(resource)
        else
          # this block will be used when user is required to be confirmed
          user_flash_msg if is_navigational_format? #created a custom method to set flash message
          expire_data_after_sign_in!
          respond_with resource, :location => after_inactive_sign_up_path_for(resource)
        end
      else
        @group.destroy
        # this block is used when validation fails
        clean_up_passwords resource
        respond_to do |format|
            format.js
        end
      end
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end
  private
  def user_flash_msg
    if resource.inactive_message == :unconfirmed
      #check for inactive_message and pass email variable to devise locals message
      set_flash_message :notice, :"signed_up_but_unconfirmed", email: resource.email
    else
      set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}"
    end
  end

  protected
  def sign_up_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
