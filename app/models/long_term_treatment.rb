class LongTermTreatment < ActiveRecord::Base
  validates :patient_doctor_id,
    :base_glucose,
    :base_dosage,
    :current_dosage,
    :titration,
    :interval,
    :drug_name, presence: true

  validates :patient_doctor_id, uniqueness: true

  belongs_to :patient_doctor

  has_one :patient,
    through: :patient_doctor,
    source: :patient

  has_one :doctor,
    through: :patient_doctor,
    source: :doctor

  has_many :logs,
    through: :patient,
    source: :logs

  def calc_dosage
    select_logs = logs.where(meal_type: "breakfast")
      .order(date: :desc)
      .select(:glucose)

    if select_logs.count < self.interval
      self.base_dosage
    else
      recent_logs = select_logs.limit(self.interval)

      sum = 0
      recent_logs.each do |log|
        sum += log.glucose
      end

      avg_glucose = (sum / self.interval).to_i

      if avg_glucose > self.base_glucose
        dosage = self.current_dosage
        dosage ||= self.base_dosage

        dosage + self.interval
      else
        self.current_dosage
      end
    end
  end

  def update_treatment
    self.update_attributes({current_dosage: calc_dosage})
  end
end

# LongTermTreatment.create({patient_doctor_id: 1, base_glucose: 100, base_dosage: 5, current_dosage: 5, titration: 3, interval: 3, drug_name: "insulin"})
