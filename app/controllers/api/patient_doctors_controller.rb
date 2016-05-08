class Api::PatientDoctorsController < ApplicationController
  def create
    @patient_doctor = PatientDoctor.new(patient_doctor_params)

    if @patient_doctor.save
      if params[:ttype] == "Patient"
         @patient = @patient_doctor.patient
         render "api/patients/show"
      else
        @doctor = @patient_doctor.doctor
        render "api/doctors/show"
      end
    else
      @errors = @patient_doctor.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def destroy
  end

  def show
  end

  private
  def patient_doctor_params
    params.require(:patient_doctor).permit(:patient_id, :doctor_id)
  end
end
