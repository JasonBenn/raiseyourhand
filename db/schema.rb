# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130710135343) do

  create_table "answers", :force => true do |t|
    t.integer  "question_id"
    t.string   "text"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.integer  "user_id"
  end

  create_table "contents", :force => true do |t|
    t.integer  "lesson_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "url"
    t.string   "position"
    t.string   "start_time"
    t.string   "finish_time"
    t.string   "duration"
    t.string   "title"
    t.string   "thumbnail"
  end

  create_table "flashcards", :force => true do |t|
    t.integer  "content_id"
    t.text     "front"
    t.text     "back"
    t.string   "time_in_lesson"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "lessons", :force => true do |t|
    t.integer  "creator_id"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
    t.string   "title"
    t.integer  "votes_count", :default => 0
  end

  add_index "lessons", ["title"], :name => "index_lessons_on_title"

  create_table "questions", :force => true do |t|
    t.string   "text"
    t.integer  "content_id"
    t.string   "time_in_lesson"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.string   "title"
    t.integer  "answers_count",  :default => 0
    t.integer  "votes_count",    :default => 0
    t.integer  "user_id"
  end

  add_index "questions", ["title"], :name => "index_questions_on_title"

  create_table "searches", :force => true do |t|
    t.string   "term"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "searches", ["searchable_id"], :name => "index_searches_on_searchable_id"
  add_index "searches", ["searchable_type"], :name => "index_searches_on_searchable_type"
  add_index "searches", ["term"], :name => "index_searches_on_term"

  create_table "user_lessons", :force => true do |t|
    t.integer  "user_id"
    t.integer  "lesson_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
  end

  create_table "votes", :force => true do |t|
    t.integer  "votable_id"
    t.string   "votable_type"
    t.integer  "user_id"
    t.integer  "direction"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

end
