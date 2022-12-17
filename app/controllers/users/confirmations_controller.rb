# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  # GET /resource/confirmation/new
  # def new
  #   super
  # end

  # POST /resource/confirmation
  # def create
  #   super
  # end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token]) 
    if self.resource.active == false
      self.resource.active=1;
    
    
      self.resource.save  
      if resource.errors.empty?
          
          set_flash_message(:notice, :confirmed) if is_navigational_format?
          sign_in(resource_name, resource)
  
          # Send the user a second email          
          # send_post_confirmation_email
  
          respond_with_navigational(resource){ redirect_to after_confirmation_path_for(resource_name, resource) }
      else
          respond_with_navigational(resource.errors, :status => :unprocessable_entity){ render :new }
      end
    else
      respond_with_navigational(resource.errors, :status => :unprocessable_entity){ render :new }
    end
  end

  # protected

  # The path used after resending confirmation instructions.
  # def after_resending_confirmation_instructions_path_for(resource_name)
  #   super(resource_name)
  # end

  # The path used after confirmation.
  # def after_confirmation_path_for(resource_name, resource)
  #   super(resource_name, resource)
  # end
end
