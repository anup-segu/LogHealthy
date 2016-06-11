class Api::LogsController < ApplicationController
  def create
    @log = Log.new(log_params)
    @log.patient_id ||= current_patient.id
    @log.date = Date.today

    if @log.save
      @log.long_term_treatment.update_treatment if @log.long_term_treatment
      @patient = @log.patient
      render "api/patients/show"
    else
      @errors = @log.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def update
    @log = Log.find(params[:log][:id])

    if @log.update_attributes(log_params)
      @log.long_term_treatment.update_treatment if @log.long_term_treatment
      @patient = @log.patient
      render "api/patients/show"
    else
      @errors = @log.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def destroy
    @log = Log.find(params[:id])
    @log.destroy
    @patient = @log.patient
    render "api/patients/show"
  end

  private
  def log_params
    params.require(:log)
      .permit(
        :glucose,
        :meal_type,
        :meal_taken?,
        :carbs,
        :comment,
        :id,
        :patient_id
      )
  end
end
