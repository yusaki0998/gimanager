require "application_system_test_case"

class GiShoppingsTest < ApplicationSystemTestCase
  setup do
    @gi_shopping = gi_shoppings(:one)
  end

  test "visiting the index" do
    visit gi_shoppings_url
    assert_selector "h1", text: "Gi shoppings"
  end

  test "should create gi shopping" do
    visit gi_shoppings_url
    click_on "New gi shopping"

    click_on "Create Gi shopping"

    assert_text "Gi shopping was successfully created"
    click_on "Back"
  end

  test "should update Gi shopping" do
    visit gi_shopping_url(@gi_shopping)
    click_on "Edit this gi shopping", match: :first

    click_on "Update Gi shopping"

    assert_text "Gi shopping was successfully updated"
    click_on "Back"
  end

  test "should destroy Gi shopping" do
    visit gi_shopping_url(@gi_shopping)
    click_on "Destroy this gi shopping", match: :first

    assert_text "Gi shopping was successfully destroyed"
  end
end
