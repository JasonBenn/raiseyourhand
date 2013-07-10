class UserLessonsController < ApplicationController
	def destroy
		user_lesson = UserLesson.find(params[:id])
		lesson = user_lesson.lesson
		user_lesson.destroy
		flash[:notice] = "Lesson removed from notebook"
		redirect_to profile_path current_user
	end
end