Rails.application.routes.draw do
  resources :gi_accounts
  resources :weapons
  resources :charaters
  resources :positions
  resources :departments
  resources :groups
  
  root 'gi_accounts#index'

  devise_scope :user do
    authenticated :user do
      root 'gi_accounts#index', as: :authenticated_root
    end
    get "users/confirm_mail/:id"=> "users/registrations#confirm_mail", :as => "confirm_mail_registration"
    get "users/logout"=> "users/registrations#logout", :as => "logout_registration"
    end
  devise_for :users, controllers: {
        sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords',
    confirmations: 'users/confirmations'
      }
  get '/add_user' => 'users#add_user'

  get 'import'=>'users#import'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :users
  # upload avatar
    resources :users do
    member do
      get "edit_avatar"
    end
    end
  resources :departments
  get '/update_department' => 'departments#update_department'
  get '/delete_department' => 'departments#delete_department'
  get '/delete_department/[:id]' => 'departments#delete_department'
  post '/delete'=> 'departments#delete'
  get '/delete_mul_departments' => "departments#delete_mul_departments"  
  
  resources :positions
	  get 'delete_positions' => 'positions#delete_positions'
	  get 'sub_delete_positions' => 'positions#sub_delete_positions'
	  get '/update_position' => 'positions#update_position'
end
