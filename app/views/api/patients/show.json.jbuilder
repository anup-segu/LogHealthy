if @patient
  json.extract!(@patient, :email, :first_name, :last_name, :ttype)
else
  {}
end
