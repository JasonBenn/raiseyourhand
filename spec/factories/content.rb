FactoryGirl.define do
  factory :lesson do
    title 'John'
  end

  factory :content do
  	lesson FactoryGirl.create(:lesson)
	  url "http://www.youtube.com/watch?v=2YYF0j-FV3c"
	  start_time "0"
	  finish_time "600"
	  position 1
  end
end