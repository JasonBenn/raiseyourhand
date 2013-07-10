FactoryGirl.define do
  factory :lesson do
    title 'John'

    factory :lesson_with_content do
	    before(:create) do |lesson|
      	lesson.contents << build(:content, {lesson: lesson}) 
	    end
  	end

  	factory :lesson_with_muiltiple_content do
  		before(:create) { |lesson| 5.times { lesson.contents << build(:content, lesson: lesson) } }
  	end

	end

  factory :content do
	  url "http://www.youtube.com/watch?v=2zNSgSzhBfM"
	  start_time "0"
	  finish_time "600"
	  sequence(:position) { |n| n }
  end
end