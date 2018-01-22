Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'locations#index'

  # resources :locations & :reviews

  get '/locations/nearby' => 'locations#nearby'
  resources :locations do
    resources :reviews, only: [:show, :index, :new]
  end

  # resources :users

  resources :users
  get '/my-reviews' => 'users#reviews'

  # resources :sessions

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/signup' => 'users#new'

end
