json.extract! user, :id, :first_name, :last_name, :employee_code, :admin, :active, :status, :language, :schema_color, :password_default, :created_at, :updated_at
json.url user_url(user, format: :json)
