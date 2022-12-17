require "test_helper"

class CharatersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @charater = charaters(:one)
  end

  test "should get index" do
    get charaters_url
    assert_response :success
  end

  test "should get new" do
    get new_charater_url
    assert_response :success
  end

  test "should create charater" do
    assert_difference("Charater.count") do
      post charaters_url, params: { charater: { image_name: @charater.image_name, image_path: @charater.image_path, name: @charater.name, note: @charater.note, start: @charater.start, status: @charater.status } }
    end

    assert_redirected_to charater_url(Charater.last)
  end

  test "should show charater" do
    get charater_url(@charater)
    assert_response :success
  end

  test "should get edit" do
    get edit_charater_url(@charater)
    assert_response :success
  end

  test "should update charater" do
    patch charater_url(@charater), params: { charater: { image_name: @charater.image_name, image_path: @charater.image_path, name: @charater.name, note: @charater.note, start: @charater.start, status: @charater.status } }
    assert_redirected_to charater_url(@charater)
  end

  test "should destroy charater" do
    assert_difference("Charater.count", -1) do
      delete charater_url(@charater)
    end

    assert_redirected_to charaters_url
  end
end
