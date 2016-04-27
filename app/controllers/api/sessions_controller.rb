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
    if current_patient || current_doctor
      logout!
      render "api/patients/show"
    else
      @errors = ["No one logged in"]
			render "api/shared/error", status: 404
    end
  end

  def show
    if !current_patient.nil?
      render "api/patients/show"
    else
      @errors = ["No patient logged in"]
			render "api/shared/error", status: 404
    end
  end
end
