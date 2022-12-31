# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_18_025421) do
  create_table "charaters", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "image_name"
    t.string "image_path"
    t.integer "start"
    t.boolean "status"
    t.string "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "construction_companies", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "company_name"
    t.string "post_code"
    t.string "address"
    t.string "company_tel"
    t.string "email"
    t.string "urls"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "construction_teams", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "construction_team_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "departments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.bigint "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_departments_on_group_id"
  end

  create_table "gi_account_charaters", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "gi_account"
    t.integer "charater"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gi_account_weapons", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "gi_account"
    t.integer "weapon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gi_accounts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "account_mail"
    t.string "account_pass"
    t.string "account_phone"
    t.boolean "status"
    t.string "note"
    t.integer "price"
    t.integer "owner"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "list_character"
    t.string "list_weapon"
  end

  create_table "groups", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "labor_cost_details", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.date "working_date"
    t.string "list_worker"
    t.bigint "labor_cost_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["labor_cost_id"], name: "index_labor_cost_details_on_labor_cost_id"
  end

  create_table "labor_costs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.float "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "work_report_id"
    t.index ["work_report_id"], name: "index_labor_costs_on_work_report_id"
  end

  create_table "measurement_details", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.float "joint_width"
    t.float "joint_height"
    t.float "dimensions_width"
    t.float "dimenstions_height"
    t.integer "quantity"
    t.string "note"
    t.bigint "measurement_infomation_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "total"
    t.index ["measurement_infomation_id"], name: "index_measurement_details_on_measurement_infomation_id"
  end

  create_table "measurement_infomations", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "work_place"
    t.integer "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "work_report_id"
    t.index ["work_report_id"], name: "index_measurement_infomations_on_work_report_id"
  end

  create_table "other_costs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "cost_name"
    t.float "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "work_report_id"
    t.index ["work_report_id"], name: "index_other_costs_on_work_report_id"
  end

  create_table "positions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.bigint "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_positions_on_group_id"
  end

  create_table "products", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "product_name"
    t.string "colour"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sites", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "site_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_departments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "department_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["department_id"], name: "index_user_departments_on_department_id"
    t.index ["user_id"], name: "index_user_departments_on_user_id"
  end

  create_table "user_positions", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "position_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["position_id"], name: "index_user_positions_on_position_id"
    t.index ["user_id"], name: "index_user_positions_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "employee_code"
    t.boolean "admin"
    t.boolean "active"
    t.boolean "status"
    t.string "language"
    t.boolean "schema_color"
    t.string "password_default"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.bigint "group_id", null: false
    t.string "avatar"
    t.string "ic_no"
    t.string "telephone"
    t.boolean "is_full_time"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["group_id"], name: "index_users_on_group_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  create_table "weapons", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.integer "stars"
    t.string "image_name"
    t.string "image_path"
    t.boolean "status"
    t.string "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "work_reports", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "construction_companies_id"
    t.integer "construction_teams_id"
    t.date "work_date"
    t.float "working_hour"
    t.string "weather"
    t.integer "site_id"
    t.integer "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "start_minute"
    t.integer "start_hour"
    t.integer "end_minute"
    t.integer "end_hour"
  end

  add_foreign_key "departments", "groups"
  add_foreign_key "labor_cost_details", "labor_costs"
  add_foreign_key "labor_costs", "work_reports"
  add_foreign_key "measurement_details", "measurement_infomations"
  add_foreign_key "measurement_infomations", "work_reports"
  add_foreign_key "other_costs", "work_reports"
  add_foreign_key "positions", "groups"
  add_foreign_key "user_departments", "departments"
  add_foreign_key "user_departments", "users"
  add_foreign_key "user_positions", "positions"
  add_foreign_key "user_positions", "users"
  add_foreign_key "users", "groups"
end
