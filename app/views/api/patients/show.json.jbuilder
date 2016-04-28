if @patient
  json.extract!(@patient, :id, :email, :first_name, :last_name, :ttype)

  json.logs do
    json.array!(@patient.logs) do |log|
      json.partial!("api/logs/log", log: log)
    end
  end
else
  {}
end
