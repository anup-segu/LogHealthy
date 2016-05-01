# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

patient = Patient.create(
  email: "patient@demo.com",
  password: "password",
  first_name: "Patient",
  last_name: "Demo"
)

doctor = Doctor.create(
  email: "doctor@demo.com",
  password: "password",
  first_name: "Doctor",
  last_name: "Demo"
)

patient_doctor = PatientDoctor.create(
  patient_id: 1,
  doctor_id: 1
)

log_dates = (1..15).to_a.map do |num|
  num.days.ago
end

["breakfast", "lunch", "dinner"].each do |meal_type|
  log_dates.each do |date|
    Log.create(
      patient_id: 1,
      glucose: (120..200).to_a.sample,
      carbs: (0..20).to_a.sample,
      meal_type: meal_type,
      comment: "Et sustainable optio aesthetic et.",
      date: date
    )
  end
end
