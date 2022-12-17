require "application_system_test_case"

class WeaponsTest < ApplicationSystemTestCase
  setup do
    @weapon = weapons(:one)
  end

  test "visiting the index" do
    visit weapons_url
    assert_selector "h1", text: "Weapons"
  end

  test "should create weapon" do
    visit weapons_url
    click_on "New weapon"

    fill_in "Image name", with: @weapon.image_name
    fill_in "Image path", with: @weapon.image_path
    fill_in "Name", with: @weapon.name
    fill_in "Note", with: @weapon.note
    fill_in "Stars", with: @weapon.stars
    check "Status" if @weapon.status
    click_on "Create Weapon"

    assert_text "Weapon was successfully created"
    click_on "Back"
  end

  test "should update Weapon" do
    visit weapon_url(@weapon)
    click_on "Edit this weapon", match: :first

    fill_in "Image name", with: @weapon.image_name
    fill_in "Image path", with: @weapon.image_path
    fill_in "Name", with: @weapon.name
    fill_in "Note", with: @weapon.note
    fill_in "Stars", with: @weapon.stars
    check "Status" if @weapon.status
    click_on "Update Weapon"

    assert_text "Weapon was successfully updated"
    click_on "Back"
  end

  test "should destroy Weapon" do
    visit weapon_url(@weapon)
    click_on "Destroy this weapon", match: :first

    assert_text "Weapon was successfully destroyed"
  end
end
