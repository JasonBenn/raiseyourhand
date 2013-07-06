Raiseyourhand::Application.routes.draw do
  root to: 'lessons#index'

  resources :lessons 
  resources :votes

  get '/test' => 'test#index'
  match 'auth/:provider/callback', to: 'sessions#create'
  match 'auth/failure', to: redirect('/')
  match 'signout', to: 'sessions#destroy', as: 'signout'
end
