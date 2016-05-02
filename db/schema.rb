# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160502063640) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "conversations", force: :cascade do |t|
    t.integer  "author_id",      null: false
    t.string   "author_type",    null: false
    t.integer  "recipient_id",   null: false
    t.string   "recipient_type", null: false
    t.integer  "parent_id"
    t.string   "subject"
    t.text     "body",           null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "conversations", ["author_id"], name: "index_conversations_on_author_id", using: :btree
  add_index "conversations", ["parent_id"], name: "index_conversations_on_parent_id", using: :btree
  add_index "conversations", ["recipient_id"], name: "index_conversations_on_recipient_id", using: :btree

  create_table "doctors", force: :cascade do |t|
    t.string   "email",                              null: false
    t.string   "first_name",                         null: false
    t.string   "last_name",                          null: false
    t.string   "password_digest",                    null: false
    t.string   "session_token",                      null: false
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "ttype",           default: "doctor"
  end

  add_index "doctors", ["email"], name: "index_doctors_on_email", unique: true, using: :btree
  add_index "doctors", ["first_name"], name: "index_doctors_on_first_name", using: :btree
  add_index "doctors", ["last_name"], name: "index_doctors_on_last_name", using: :btree
  add_index "doctors", ["session_token"], name: "index_doctors_on_session_token", unique: true, using: :btree

  create_table "logs", force: :cascade do |t|
    t.integer  "patient_id",                 null: false
    t.float    "glucose",                    null: false
    t.float    "carbs"
    t.string   "meal_type",                  null: false
    t.boolean  "meal_taken?", default: true
    t.text     "comment"
    t.date     "date",                       null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "logs", ["patient_id", "meal_type", "date"], name: "index_logs_on_patient_id_and_meal_type_and_date", unique: true, using: :btree
  add_index "logs", ["patient_id"], name: "index_logs_on_patient_id", using: :btree

  create_table "patient_doctors", force: :cascade do |t|
    t.integer  "patient_id", null: false
    t.integer  "doctor_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "patient_doctors", ["doctor_id"], name: "index_patient_doctors_on_doctor_id", using: :btree
  add_index "patient_doctors", ["patient_id", "doctor_id"], name: "index_patient_doctors_on_patient_id_and_doctor_id", unique: true, using: :btree
  add_index "patient_doctors", ["patient_id"], name: "index_patient_doctors_on_patient_id", using: :btree

  create_table "patients", force: :cascade do |t|
    t.string   "email",                               null: false
    t.string   "first_name",                          null: false
    t.string   "last_name",                           null: false
    t.string   "password_digest",                     null: false
    t.string   "session_token",                       null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "ttype",           default: "patient"
  end

  add_index "patients", ["email"], name: "index_patients_on_email", unique: true, using: :btree
  add_index "patients", ["first_name"], name: "index_patients_on_first_name", using: :btree
  add_index "patients", ["last_name"], name: "index_patients_on_last_name", using: :btree
  add_index "patients", ["session_token"], name: "index_patients_on_session_token", unique: true, using: :btree

end
