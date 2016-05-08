json.array!(@patients) do |patient|
  json.partial!("api/patients/patient", patient: patient)
end
