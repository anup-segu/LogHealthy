class Api::SessionsController < ApplicationController
  def create
    if params[:doctor]
      session_params = params[:doctor]
    elsif params[:patient]
      session_params = params[:patient]
    end

    @patient = Patient.find_by_credentials(
      session_params[:email],
      session_params[:password]
    )

    @doctor = Doctor.find_by_credentials(
      session_params[:email],
      session_params[:password]
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
    logout!
    render "api/patients/show"
  end

  def show
    @patient = current_patient
    @doctor = current_doctor

    if !current_patient.nil?
      render "api/patients/show"
    elsif !current_doctor.nil?
      render "api/doctors/show"
    else
			render "api/shared/error" #, status: 404
    end
  end
end
