class CreateMurmurs < ActiveRecord::Migration[8.0]
  def change
    create_table :murmurs do |t|
      t.references :user, null: false, foreign_key: true
      t.string :content
      t.integer :likes_count

      t.timestamps
    end
  end
end
