class ChangeColumnNameCharater < ActiveRecord::Migration[7.0]
  def change
    rename_column :charaters, :start, :stars
  end
end
