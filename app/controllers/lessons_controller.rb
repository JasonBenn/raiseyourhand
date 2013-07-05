class LessonsController < ApplicationController
	def show
	end

	def index
	end
	
	def new
		@lesson = Lesson.new
		@lesson.contents.build
	end

	def create
		@lesson = Lesson.new(params[:lesson])
		if @lesson.save
			redirect_to edit_lesson_path(@lesson)
		else
			render :new
		end
	end



end
