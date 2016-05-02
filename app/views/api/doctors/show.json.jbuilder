if @doctor
  json.extract!(@doctor, :email, :first_name, :last_name, :ttype)

  json.patients do
    json.array!(@doctor.patients) do |patient|
      json.partial!('api/patients/patient', patient: patient)
    end
  end
else
  {}
end
