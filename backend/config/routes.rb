Rails.application.routes.draw do
namespace :api do
get 'me', to: 'users#me'


get 'timeline', to: 'murmurs#timeline'
get 'me/murmurs', to: 'murmurs#mine'
post 'me/murmurs', to: 'murmurs#create'
delete 'me/murmurs/:id', to: 'murmurs#destroy'


resources :murmurs, only: [:index, :show]


resources :users, only: [:show] do
member do
get 'murmurs', to: 'murmurs#by_user'
post 'follow', to: 'follows#create'
delete 'follow', to: 'follows#destroy'
end
end


post 'murmurs/:id/like', to: 'likes#create'
delete 'murmurs/:id/like', to: 'likes#destroy'
end
end
