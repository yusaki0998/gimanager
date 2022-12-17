require "application_system_test_case"

class CharatersTest < ApplicationSystemTestCase
  setup do
    @charater = charaters(:one)
  end

  test "visiting the index" do
    visit charaters_url
    assert_selector "h1", text: "Charaters"
  end

  test "should create charater" do
    visit charaters_url
    click_on "New charater"

    fill_in "Image name", with: @charater.image_name
    fill_in "Image path", with: @charater.image_path
    fill_in "Name", with: @charater.name
    fill_in "Note", with: @charater.note
    fill_in "Start", with: @charater.start
    check "Status" if @charater.status
    click_on "Create Charater"

    assert_text "Charater was successfully created"
    click_on "Back"
  end

  test "should update Charater" do
    visit charater_url(@charater)
    click_on "Edit this charater", match: :first

    fill_in "Image name", with: @charater.image_name
    fill_in "Image path", with: @charater.image_path
    fill_in "Name", with: @charater.name
    fill_in "Note", with: @charater.note
    fill_in "Start", with: @charater.start
    check "Status" if @charater.status
    click_on "Update Charater"

    assert_text "Charater was successfully updated"
    click_on "Back"
  end

  test "should destroy Charater" do
    visit charater_url(@charater)
    click_on "Destroy this charater", match: :first

    assert_text "Charater was successfully destroyed"
  end
end
