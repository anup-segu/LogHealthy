class PatientDoctor < ActiveRecord::Base
  validates :patient_id, :doctor_id, presence: true
  validates :patient_id, uniqueness: { scope: :doctor_id }

  belongs_to :patient
  belongs_to :doctor
end
