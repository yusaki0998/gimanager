require "test_helper"

class GiAccountsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @gi_account = gi_accounts(:one)
  end

  test "should get index" do
    get gi_accounts_url
    assert_response :success
  end

  test "should get new" do
    get new_gi_account_url
    assert_response :success
  end

  test "should create gi_account" do
    assert_difference("GiAccount.count") do
      post gi_accounts_url, params: { gi_account: { account_mail: @gi_account.account_mail, account_pass: @gi_account.account_pass, account_phone: @gi_account.account_phone, note: @gi_account.note, owner: @gi_account.owner, price: @gi_account.price, status: @gi_account.status } }
    end

    assert_redirected_to gi_account_url(GiAccount.last)
  end

  test "should show gi_account" do
    get gi_account_url(@gi_account)
    assert_response :success
  end

  test "should get edit" do
    get edit_gi_account_url(@gi_account)
    assert_response :success
  end

  test "should update gi_account" do
    patch gi_account_url(@gi_account), params: { gi_account: { account_mail: @gi_account.account_mail, account_pass: @gi_account.account_pass, account_phone: @gi_account.account_phone, note: @gi_account.note, owner: @gi_account.owner, price: @gi_account.price, status: @gi_account.status } }
    assert_redirected_to gi_account_url(@gi_account)
  end

  test "should destroy gi_account" do
    assert_difference("GiAccount.count", -1) do
      delete gi_account_url(@gi_account)
    end

    assert_redirected_to gi_accounts_url
  end
end
