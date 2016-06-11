Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api do
    resource :patient, only: [:create]
    resources :patients, only: [:show, :index]
    resources :patient_doctors, only: [:create, :destroy]
    resource :doctor, only: [:create]
    resources :doctors, only: [:index, :show]
    resource :session, only: [:create, :destroy, :show]
    resources :logs, only: [:create, :destroy, :update]
    resources :conversations, only: [:create, :index]
    resources :long_term_treatments, only: [:create, :update, :destroy]
  end
end
