class Api::LogsController < ApplicationController
  def create
    @log = Log.new(log_params)
    @log.patient_id = current_patient.id
    @log.date = Date.today

    if @log.save
      @patient = current_patient
      render "api/patient/show"
    else
      @errors = @log.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  private
  def log_params
    params.require(:log)
      .permit(:glucose, :meal_type, :meal_taken?, :comment)
  end
end
