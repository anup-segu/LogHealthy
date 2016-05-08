class Api::DoctorsController < ApplicationController
  def index
    @doctors = Doctor.all
    render "api/doctors/index"
  end

  def show
    @doctor = Doctor.find(params[:id])
    render "api/doctors/doctor"
  end

  def create
    @doctor = Doctor.new(doctor_params)

    if @doctor.save
      login!(@doctor)
      render "api/doctors/show"
    else
      @errors = @doctor.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  private
  def doctor_params
    params
      .require(:doctor)
      .permit(
        :email,
        :first_name,
        :last_name,
        :password
      )
  end
end
