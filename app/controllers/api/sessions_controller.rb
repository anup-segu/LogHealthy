class Api::SessionsController < ApplicationController
  def create
    @patient = Patient.find_by_credentials(
      params[:patient][:email],
      params[:patient][:password]
    )

    @doctor = Doctor.find_by_credentials(
      params[:patient][:email],
      params[:patient][:password]
    )

    if @patient
      login!(@patient)
      render "api/patients/show"
    elsif @doctor
      login!(@doctor)
      render "api/doctors/show"
    else
      @errors = ["Invalid login, please try again"]
      render "api/shared/error", status: 401
    end
  end

  def destroy
    puts session[:session_token]
    puts session["session_token"]

    if current_patient || current_doctor
      logout!
      render "api/patients/show"
    else
      render "api/shared/error", status: 404
    end
  end

  def show
    @patient = current_patient
    @doctor = current_doctor

    if !current_patient.nil?
      render "api/patients/show"
    elsif !current_doctor.nil?
      render "api/doctors/show"
    else
			render "api/shared/error", status: 404
    end
  end
end
