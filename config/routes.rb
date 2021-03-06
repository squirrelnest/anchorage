Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'locations#index'

  # resources :locations & :reviews

  get '/locations/nearby' => 'locations#nearby'
  get '/locations/geojson' => 'locations#geojson'
  resources :locations do
    resources :reviews
  end

  # resources :reviews

  resources :reviews, only: [:show, :edit, :update, :destroy]

  # resources :users

  resources :users
  get '/my-reviews' => 'users#reviews'

  # resources :sessions

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/signup' => 'users#new'
  get '/auth/facebook/callback' => 'sessions#fb_auth'

end
