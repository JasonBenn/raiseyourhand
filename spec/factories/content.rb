FactoryGirl.define do
  factory :lesson do
    title 'John'

    factory :lesson_with_content do
	    after(:create) do |lesson|
      	create(:content, {lesson: lesson})
	    end
  	end

  	factory :lesson_with_muiltiple_content do
  		after(:create) { |lesson| 5.times { create(:content, lesson: lesson) } }
  	end

	end

  factory :content do
	  url "http://www.youtube.com/watch?v=2YYF0j-FV3c"
	  start_time "0"
	  finish_time "600"
	  sequence(:position) { |n| n }
  end
end