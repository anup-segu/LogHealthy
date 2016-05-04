if @patient
  json.extract!(@patient, :id, :email, :first_name, :last_name, :ttype)

  json.logs @patient.logs_hash

  json.doctor @patient.doctor_extract

else
  {}
end
