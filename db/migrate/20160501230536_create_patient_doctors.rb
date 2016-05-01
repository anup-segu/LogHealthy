class CreatePatientDoctors < ActiveRecord::Migration
  def change
    create_table :patient_doctors do |t|
      t.integer :patient_id, null: false
      t.integer :doctor_id, null: false

      t.timestamps null: false
    end

    add_index :patient_doctors, :doctor_id
    add_index :patient_doctors, :patient_id
    add_index :patient_doctors, [:patient_id, :doctor_id], unique: true
  end
end
