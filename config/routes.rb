Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api do
    resource :patient, only: [:create]
    resource :doctor, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    resources :logs, only: [:create, :destroy, :update]
  end
end
