class CreateLongTermTreatments < ActiveRecord::Migration
  def change
    create_table :long_term_treatments do |t|
      t.integer :patient_doctor_id, null: false
      t.integer :base_glucose, null: false
      t.integer :base_dosage, null: false
      t.integer :current_dosage, null: false
      t.integer :titration, null: false
      t.integer :interval, null: false
      t.string :drug_name, null: false

      t.timestamps null: false
    end

    add_index :long_term_treatments, :patient_doctor_id, unique: true
  end
end
