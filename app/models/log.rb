class Log < ActiveRecord::Base
  validates :patient_id, :glucose, :meal_type, :date, presence: true
  validates :meal_taken?, inclusion: { in: [true, false] }
  validates :meal_type, inclusion: { in: ["breakfast", "lunch", "dinner"] }

  validates :patient_id, uniqueness: { scope: [:meal_type, :date] }

  belongs_to :patient
end
