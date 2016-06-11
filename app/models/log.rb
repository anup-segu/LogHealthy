class Log < ActiveRecord::Base
  validates :patient_id, :glucose, :meal_type, :date, presence: true
  validates :meal_taken?, inclusion: { in: [true, false] }
  validates :meal_type, inclusion: { in: ["breakfast", "lunch", "dinner"] }

  validates :patient_id,
    uniqueness: { scope: [:meal_type, :date], message: ["Log already exists for this meal"] }

  belongs_to :patient

  has_one :long_term_treatment,
    through: :patient,
    source: :long_term_treatment
end
