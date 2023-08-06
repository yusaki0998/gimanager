class ApplicationController < ActionController::Base
	protect_from_forgery with: :null_session
	before_action :set_locale
  before_action :authenticate_user!, except: [:index, :show]
	ALLOWED_LOCALES = %w( ja en vi ).freeze
  DEFAULT_LOCALE = 'vi'.freeze

	def set_locale
    if user_signed_in? && !current_user.language.nil?                
      locale = current_user.language.to_s.strip.to_sym
      if I18n.available_locales.include?(locale) 
        I18n.locale = locale
      end
    else        
      I18n.locale = extract_locale_from_headers        
    end
    
    if !current_user.nil? && current_user.language.nil?
      current_user.language = I18n.locale.to_s
    end
  end
  
  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, :alert => "You are not authorized to access this page. So you comeback to home page"
    # render 403, etc.
  end

  def extract_locale_from_headers
    browser_locale = request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
    if ALLOWED_LOCALES.include?(browser_locale)
      browser_locale
    else
      DEFAULT_LOCALE
    end
  end
end
