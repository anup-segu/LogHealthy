Rails.application.routes.draw do
  root to: 'static_pages#root'
<<<<<<< HEAD
<<<<<<< HEAD

  namespace :api do
    resource :patient, only: [:create]
    resource :doctor, only: [:create]
    resource :session, only: [:create, :destroy, :show]
  end

=======
>>>>>>> 250a21fa7bfd9b6691a5b75a8d3a03893bebbba9
=======
>>>>>>> fb22e4ae2b1cfcefd1da99ce92d6d004f6739009
end
