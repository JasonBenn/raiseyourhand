Raiseyourhand::Application.routes.draw do
  root to: 'lessons#index'

  match 'lessons/list', to: 'lessons#list'
  resources :lessons
  resources :votes
  resources :flashcards
  resources :contents
  resources :questions
  resources :answers
  resources :profiles, only: [:show]
  resources :user_lessons, only: [:destroy]

  get '/test' => 'test#index'
  match 'auth/:provider/callback', to: 'sessions#create'
  match 'auth/failure', to: redirect('/')
  match 'signout', to: 'sessions#destroy', as: 'signout'
  match 'search' => 'searches#search'
  put 'sortorder', to: 'contents#sortorder'
end
