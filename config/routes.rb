Raiseyourhand::Application.routes.draw do
  root to: 'lessons#index'

  resources :lessons
  resources :votes
  resources :flashcards
  resources :contents
  resources :questions
  resources :answers

  get '/test' => 'test#index'
  match 'auth/:provider/callback', to: 'sessions#create'
  match 'auth/failure', to: redirect('/')
  match 'signout', to: 'sessions#destroy', as: 'signout'
  match 'search' => 'searches#search'
  put 'sortorder', to: 'contents#sortorder'
end
