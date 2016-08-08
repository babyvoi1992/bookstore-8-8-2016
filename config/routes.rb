Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount_devise_token_auth_for 'User', at: 'api/v1' , skip: [:omniauth_callbacks]
  resources :demo, except: [:new,:create,:update,:destroy,:edit,:show] do
    collection do
      get 'info'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    namespace :v1 do


      #resources :users, only: [:index, :show ]
      resources :books, only: [:create, :index, :destroy, :update]
    end
  end

end
