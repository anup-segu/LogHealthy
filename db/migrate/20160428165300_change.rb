class Change < ActiveRecord::Migration
  def change
    add_column :doctors, :ttype, :string, default: "doctor"
  end
end
