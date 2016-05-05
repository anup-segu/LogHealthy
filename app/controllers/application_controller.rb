class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

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

  def current_user
    # return current_patient if current_patient
    return current_doctor if current_doctor
    nil
  end

  def logout!
    current_patient.reset_session_token! if current_patient
    current_doctor.reset_session_token! if current_doctor
    @current_patient = nil
    @current_doctor = nil
    session[:session_token] = nil
  end
end
