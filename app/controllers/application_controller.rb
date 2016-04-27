class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
<<<<<<< HEAD
<<<<<<< HEAD

  def login!(account)
    session[:session_token] = account.reset_session_token!
  end

  def current_patient
    @current_patient ||=
      Patient.find_by(session_token: session[:session_token])
  end

  def current_doctor
    @current_doctor ||=
      Doctor.find_by(session_token: session[:session_token])
  end

  def logout!
    session[:session_token] = nil
    current_patient.reset_session_token! if current_patient
    current_doctor.reset_session_token! if current_doctor
    @current_patient = nil
    @current_doctor = nil
  end
=======
>>>>>>> 250a21fa7bfd9b6691a5b75a8d3a03893bebbba9
=======
>>>>>>> fb22e4ae2b1cfcefd1da99ce92d6d004f6739009
end
