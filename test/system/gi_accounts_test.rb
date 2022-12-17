require "application_system_test_case"

class GiAccountsTest < ApplicationSystemTestCase
  setup do
    @gi_account = gi_accounts(:one)
  end

  test "visiting the index" do
    visit gi_accounts_url
    assert_selector "h1", text: "Gi accounts"
  end

  test "should create gi account" do
    visit gi_accounts_url
    click_on "New gi account"

    fill_in "Account mail", with: @gi_account.account_mail
    fill_in "Account pass", with: @gi_account.account_pass
    fill_in "Account phone", with: @gi_account.account_phone
    fill_in "Note", with: @gi_account.note
    fill_in "Owner", with: @gi_account.owner
    fill_in "Price", with: @gi_account.price
    check "Status" if @gi_account.status
    click_on "Create Gi account"

    assert_text "Gi account was successfully created"
    click_on "Back"
  end

  test "should update Gi account" do
    visit gi_account_url(@gi_account)
    click_on "Edit this gi account", match: :first

    fill_in "Account mail", with: @gi_account.account_mail
    fill_in "Account pass", with: @gi_account.account_pass
    fill_in "Account phone", with: @gi_account.account_phone
    fill_in "Note", with: @gi_account.note
    fill_in "Owner", with: @gi_account.owner
    fill_in "Price", with: @gi_account.price
    check "Status" if @gi_account.status
    click_on "Update Gi account"

    assert_text "Gi account was successfully updated"
    click_on "Back"
  end

  test "should destroy Gi account" do
    visit gi_account_url(@gi_account)
    click_on "Destroy this gi account", match: :first

    assert_text "Gi account was successfully destroyed"
  end
end
