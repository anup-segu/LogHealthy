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

conversation_start = Conversation.create(
  author_id: 1,
  author_type: "Patient",
  recipient_id: 1,
  recipient_type: "Doctor",
  subject: "Checking in",
  body: "Hey Doc, how is my progress looking, any thoughts or concerns?"
)

response = Conversation.create(
  author_id: 1,
  author_type: "Doctor",
  recipient_id: 1,
  recipient_type: "Patient",
  parent_id: 1,
  subject: "Checking in",
  body: "Looks good to me. Your blood sugar is within the targets we set out. Keep up the good work!"
)

response2 = Conversation.create(
  author_id: 1,
  author_type: "Patient",
  recipient_id: 1,
  recipient_type: "Doctor",
  parent_id: 2,
  subject: "Checking in",
  body: "Great, thanks Doc!"
)


log_dates = (1..15).to_a.map do |num|
  num.days.ago
end

# Create logs for patient demo
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

# Create Patients seeing Doctor Demo Account
10.times do |num|
  Patient.create(
    email: Faker::Internet.email,
    password: "password",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name
  )

  ["breakfast", "lunch", "dinner"].each do |meal_type|
    log_dates.each do |date|
      Log.create(
        patient_id: num+2,
        glucose: (120..200).to_a.sample,
        carbs: (0..20).to_a.sample,
        meal_type: meal_type,
        comment: "Et sustainable optio aesthetic et.",
        date: date
      )
    end
  end

  PatientDoctor.create(patient_id: num + 2, doctor_id: 1)
end


# Create patients without doctor
10.times do |num|
  Patient.create(
    email: Faker::Internet.email,
    password: "password",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name
  )

  ["breakfast", "lunch", "dinner"].each do |meal_type|
    log_dates.each do |date|
      Log.create(
        patient_id: num+12,
        glucose: (120..200).to_a.sample,
        carbs: (0..20).to_a.sample,
        meal_type: meal_type,
        comment: "Et sustainable optio aesthetic et.",
        date: date
      )
    end
  end
end

# Create doctors without patients
10.times do |num|
  Doctor.create(
    email: Faker::Internet.email,
    password: "password",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name
  )
end


conversation_start = Conversation.create(
  author_id: 2,
  author_type: "Patient",
  recipient_id: 1,
  recipient_type: "Doctor",
  subject: "Any tips?",
  body: "Hey Doc, any thoughts on how I can lower my glucose. Seems kind of high?"
)

response = Conversation.create(
  author_id: 1,
  author_type: "Doctor",
  recipient_id: 2,
  recipient_type: "Patient",
  parent_id: 4,
  subject: "Any tips?",
  body: "Best advice would be to lower your carb in take. We might need to update your treatment too"
)

response2 = Conversation.create(
  author_id: 2,
  author_type: "Patient",
  recipient_id: 1,
  recipient_type: "Doctor",
  parent_id: 5,
  subject: "Any tips?",
  body: "Appreciate it. I will try to schedule an appointment to follow up on this"
)

conversation_start = Conversation.create(
  author_id: 3,
  author_type: "Patient",
  recipient_id: 1,
  recipient_type: "Doctor",
  subject: "Thoughts about diet",
  body: "Hey Doc, was looking into a low carb diet. Think this is a good idea?"
)

response = Conversation.create(
  author_id: 1,
  author_type: "Doctor",
  recipient_id: 3,
  recipient_type: "Patient",
  parent_id: 7,
  subject: "Thoughts about diet",
  body: "Great question - what would you be mainly eating?"
)

response2 = Conversation.create(
  author_id: 3,
  author_type: "Patient",
  recipient_id: 1,
  recipient_type: "Doctor",
  parent_id: 8,
  subject: "Thoughts about diet",
  body: "I would be probably avoiding main carbs such as bread and rice, and focus on lean proteins"
)


conversation_start = Conversation.create(
  author_id: 1,
  author_type: "Patient",
  recipient_id: 1,
  recipient_type: "Doctor",
  subject: "Next appointment",
  body: "Hey Doc, should I come in next month - I've been making great progress"
)

response = Conversation.create(
  author_id: 1,
  author_type: "Doctor",
  recipient_id: 1,
  recipient_type: "Patient",
  parent_id: 10,
  subject: "Next appointment",
  body: "Definitely, seems like you are making great progress so we can revisit your treatment and fine tune things"
)

response2 = Conversation.create(
  author_id: 1,
  author_type: "Patient",
  recipient_id: 1,
  recipient_type: "Doctor",
  parent_id: 11,
  subject: "Next appointment",
  body: "Sounds good!"
)

conversation_start = Conversation.create(
  author_id: 1,
  author_type: "Doctor",
  recipient_id: 1,
  recipient_type: "Patient",
  subject: "Follow Up",
  body: "Hey just checking in. Its been a couple weeks and probably time for a follow up"
)

response = Conversation.create(
  author_id: 1,
  author_type: "Patient",
  recipient_id: 1,
  recipient_type: "Doctor",
  parent_id: 13,
  subject: "Follow Up",
  body: "Sounds good, I will contact your office"
)

response2 = Conversation.create(
  author_id: 1,
  author_type: "Doctor",
  recipient_id: 1,
  recipient_type: "Patient",
  parent_id: 14,
  subject: "Follow Up",
  body: "Great, looking forward to it"
)

conversation_start = Conversation.create(
  author_id: 1,
  author_type: "Doctor",
  recipient_id: 1,
  recipient_type: "Patient",
  subject: "High Glucose Yesterday",
  body: "Hey I was a little concerned with your reading yesterday - are you keeping up with treatment"
)

response = Conversation.create(
  author_id: 1,
  author_type: "Patient",
  recipient_id: 1,
  recipient_type: "Doctor",
  parent_id: 16,
  subject: "High Glucose Yesterday",
  body: "Hey yes, I was a little over yesterday but have been feeling ok since"
)

response2 = Conversation.create(
  author_id: 1,
  author_type: "Doctor",
  recipient_id: 1,
  recipient_type: "Patient",
  parent_id: 17,
  subject: "High Glucose Yesterday",
  body: "Ok, well lets schedule an apt to see if we should revisit anything"
)
