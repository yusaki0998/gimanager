# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  def create
    @user = User.find_by(email: params[:user][:email])
        if @user
            password_user_encrypt = BCrypt::Password.new(@user.encrypted_password)
            password_input = params[:user][:password]
            if @user.active and @user.status         
                super
                # ActionCable.server.broadcast("notification_channel_#{@user.id}", "logout")
            elsif @user.active and !@user.status && password_user_encrypt == password_input          
                raw_token, hashed_token = Devise.token_generator.generate(User, :reset_password_token)
                # @user.reset_password_token = hashed_token
                # @user.reset_password_sent_at = Time.now.utc
                # @user.save!
                @user.update_columns(reset_password_token: hashed_token,reset_password_sent_at: Time.now.utc)

                reset_password_token = @user.reset_password_token
                reset_password_url = Rails.application.routes.url_helpers.edit_user_password_path(reset_password_token: raw_token)
                redirect_to reset_password_url
            elsif password_user_encrypt != password_input
                flash.now[:alert]="アカウントが無効です。CS室に問い合わせてください。"
                super
            else
                flash.now[:alert]="アカウントが無効です。CS室に問い合わせてください。"
                super
            end
        else
            super
        end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
