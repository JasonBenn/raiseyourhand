class LessonsController < ApplicationController
	before_filter :authenticated, only: [:new, :create, :edit]

	def index
		@home = true
		@lessons = Lesson.all
	end

	def show
		@lesson = Lesson.find(params[:id])
		@question = Question.new
		@flashcard = Flashcard.new
	end
	
	def new
		@lesson = Lesson.new
		@lesson.contents.build
	end

	def create
		@lesson = current_user.created_lessons.build(params[:lesson])
		if @lesson.save
			redirect_to edit_lesson_path(@lesson)
		else
			render :new
		end
	end

	def edit
		@lesson = current_user.created_lessons.find(params[:id])
	end

	def update
	end

end

