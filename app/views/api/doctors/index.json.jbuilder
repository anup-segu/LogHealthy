json.array!(@doctors) do |doctor|
  json.partial!("api/doctors/doctor", doctor: doctor)
end
