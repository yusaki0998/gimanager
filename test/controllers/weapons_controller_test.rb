require "test_helper"

class WeaponsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @weapon = weapons(:one)
  end

  test "should get index" do
    get weapons_url
    assert_response :success
  end

  test "should get new" do
    get new_weapon_url
    assert_response :success
  end

  test "should create weapon" do
    assert_difference("Weapon.count") do
      post weapons_url, params: { weapon: { image_name: @weapon.image_name, image_path: @weapon.image_path, name: @weapon.name, note: @weapon.note, stars: @weapon.stars, status: @weapon.status } }
    end

    assert_redirected_to weapon_url(Weapon.last)
  end

  test "should show weapon" do
    get weapon_url(@weapon)
    assert_response :success
  end

  test "should get edit" do
    get edit_weapon_url(@weapon)
    assert_response :success
  end

  test "should update weapon" do
    patch weapon_url(@weapon), params: { weapon: { image_name: @weapon.image_name, image_path: @weapon.image_path, name: @weapon.name, note: @weapon.note, stars: @weapon.stars, status: @weapon.status } }
    assert_redirected_to weapon_url(@weapon)
  end

  test "should destroy weapon" do
    assert_difference("Weapon.count", -1) do
      delete weapon_url(@weapon)
    end

    assert_redirected_to weapons_url
  end
end
