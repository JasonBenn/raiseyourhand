class LessonsController < ApplicationController
	def show
	end

	def index
		@home = true
		@lessons = Lesson.all
	end

	def show
		@lesson = Lesson.find(params[:id])
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

	def edit
		@lesson = Lesson.find(params[:id])
		p "~~~~~~~~~~~~~~~"
		p @lesson.contents.count
	end

	def update
	end
end

