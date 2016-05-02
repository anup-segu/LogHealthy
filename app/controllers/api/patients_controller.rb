class Api::PatientsController < ApplicationController
  def create
    @patient = Patient.new(patient_params)

    if @patient.save
      login!(@patient)
      render "api/patients/show"
    else
      @errors = @patient.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def show
    @patient = Patient.find(params[:id])

    if @patient
      render "api/patients/show"
    else
      render "api/shared/error", status: 422
    end
  end

  private
  def patient_params
    params
      .require(:patient)
      .permit(
        :email,
        :first_name,
        :last_name,
        :password
      )
  end
end
