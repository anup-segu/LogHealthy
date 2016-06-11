class Api::LongTermTreatmentsController < ApplicationController
  def create
    @long_term_treatment =
      LongTermTreatment.new(long_term_treatment_params)

    if @long_term_treatment.save
      render "api/long_term_treatments/show"
    else
      @errors = @long_term_treatment.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def update
    @long_term_treatment = LongTermTreatment.find(params[:long_term_treatment][:id])

    if @long_term_treatment.update_attributes(long_term_treatment_params)
      render "api/long_term_treatments/show"
    else
      @errors = @long_term_treatment.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def destroy
    @long_term_treatment = LongTermTreatment.find(params[:long_term_treatment][:id])
    @long_term_treatment.destroy
    @doctor = @long_term_treatment.doctor
    render "api/doctors/show"
  end

  private
  def long_term_treatment_params
    params.require(:long_term_treatment)
      .permit(
        :patient_doctor_id,
        :base_glucose,
        :base_dosage,
        :current_dosage,
        :titration,
        :interval,
        :drug_name
      )
  end
end
