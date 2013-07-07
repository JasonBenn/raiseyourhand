module LessonsHelper
	def get_question_timing(video)
	  times = {}
      video.questions.each {|question| times[question.time_in_content.to_f.ceil] = question} 
      times
	end
end
