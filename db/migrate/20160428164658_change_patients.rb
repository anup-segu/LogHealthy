class ChangePatients < ActiveRecord::Migration
  def change
    add_column :patients, :ttype, :string, default: "patient"
  end
end
