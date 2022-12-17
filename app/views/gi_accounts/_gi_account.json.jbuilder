json.extract! gi_account, :id, :account_mail, :account_pass, :account_phone, :status, :note, :price, :owner, :created_at, :updated_at
json.url gi_account_url(gi_account, format: :json)
