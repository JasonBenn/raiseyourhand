module LessonsHelper
	def get_question_timing(video)
	  times = {}
      video.questions.each {|question| times[question.time_in_content.to_f.ceil] = question} 
      times
	end

	def find_user_lesson(user_id, lesson_id)
		UserLesson.find_by_user_id_and_lesson_id(user_id, lesson_id)
	end
end