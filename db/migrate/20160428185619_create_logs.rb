class CreateLogs < ActiveRecord::Migration
  def change
    create_table :logs do |t|
      t.integer :patient_id, null: false
      t.float :glucose, null: false
      t.float :carbs
      t.string :meal_type, null: false
      t.boolean :meal_taken?, default: true
      t.text :comment
      t.date :date, null: false

      t.timestamps null: false
    end

    add_index :logs, :patient_id
    add_index :logs, [:patient_id, :meal_type, :date], unique: true
  end
end
