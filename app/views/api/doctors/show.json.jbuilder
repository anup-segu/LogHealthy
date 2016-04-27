if @doctor
  json.extract!(@doctor, :email, :first_name, :last_name)
else
  {}
end
