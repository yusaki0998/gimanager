require "test_helper"

class GiShoppingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @gi_shopping = gi_shoppings(:one)
  end

  test "should get index" do
    get gi_shoppings_url
    assert_response :success
  end

  test "should get new" do
    get new_gi_shopping_url
    assert_response :success
  end

  test "should create gi_shopping" do
    assert_difference("GiShopping.count") do
      post gi_shoppings_url, params: { gi_shopping: {  } }
    end

    assert_redirected_to gi_shopping_url(GiShopping.last)
  end

  test "should show gi_shopping" do
    get gi_shopping_url(@gi_shopping)
    assert_response :success
  end

  test "should get edit" do
    get edit_gi_shopping_url(@gi_shopping)
    assert_response :success
  end

  test "should update gi_shopping" do
    patch gi_shopping_url(@gi_shopping), params: { gi_shopping: {  } }
    assert_redirected_to gi_shopping_url(@gi_shopping)
  end

  test "should destroy gi_shopping" do
    assert_difference("GiShopping.count", -1) do
      delete gi_shopping_url(@gi_shopping)
    end

    assert_redirected_to gi_shoppings_url
  end
end
