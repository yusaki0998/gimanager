Rails.application.routes.draw do
  get 'delete_accounts' => 'gi_accounts#delete_accounts'
  get '/show_result_searching' => 'gi_shoppings#show_result_searching'
  resources :gi_shoppings
  post 'import_list_acc' => 'gi_accounts#import_list_acc'
  resources :gi_accounts
  resources :weapons
  resources :charaters
  resources :positions
  resources :departments
  resources :groups

  devise_scope :user do
    get "users/confirm_mail/:id" => "users/registrations#confirm_mail", as: "confirm_mail_registration"
    get "users/logout" => "users/registrations#logout", as: "logout_registration"
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords',
    confirmations: 'users/confirmations'
  }

  root 'gi_shoppings#index'
  get '/add_user' => 'users#add_user'
  get 'import'=>'users#import'
  resources :users
    resources :users do
      member do
        get "edit_avatar"
      end
    end
  end
