require "application_system_test_case"

class UsersTest < ApplicationSystemTestCase
  setup do
    @user = users(:one)
  end

  test "visiting the index" do
    visit users_url
    assert_selector "h1", text: "Users"
  end

  test "should create user" do
    visit users_url
    click_on "New user"

    check "Active" if @user.active
    check "Admin" if @user.admin
    fill_in "Employee code", with: @user.employee_code
    fill_in "First name", with: @user.first_name
    fill_in "Language", with: @user.language
    fill_in "Last name", with: @user.last_name
    fill_in "Password default", with: @user.password_default
    check "Schema color" if @user.schema_color
    check "Status" if @user.status
    click_on "Create User"

    assert_text "User was successfully created"
    click_on "Back"
  end

  test "should update User" do
    visit user_url(@user)
    click_on "Edit this user", match: :first

    check "Active" if @user.active
    check "Admin" if @user.admin
    fill_in "Employee code", with: @user.employee_code
    fill_in "First name", with: @user.first_name
    fill_in "Language", with: @user.language
    fill_in "Last name", with: @user.last_name
    fill_in "Password default", with: @user.password_default
    check "Schema color" if @user.schema_color
    check "Status" if @user.status
    click_on "Update User"

    assert_text "User was successfully updated"
    click_on "Back"
  end

  test "should destroy User" do
    visit user_url(@user)
    click_on "Destroy this user", match: :first

    assert_text "User was successfully destroyed"
  end
end
