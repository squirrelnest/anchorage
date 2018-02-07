Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'locations#index'

  # resources :locations & :reviews

  get '/locations/nearby' => 'locations#nearby'
  get '/locations/geojson' => 'locations#geojson'
  get '/locations/by_country/:country' => 'locations#by_country'
  get '/locations/new/:lon/:lat' => 'locations#new', :constraints => { :lon => /[^\/]+/, :lat => /[^\/]+/ }
  get '/locations/get_country/:lon/:lat' => 'locations#get_country', :constraints => { :lon => /[^\/]+/, :lat => /[^\/]+/ }
  get '/locations/mapbox_token' => 'locations#mapbox_token', :constraints => { :lon => /[^\/]+/, :lat => /[^\/]+/ }

  resources :locations do
    resources :reviews
  end

  # resources :reviews

  resources :reviews

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
