class LessonsController < ApplicationController
	before_filter :authenticated, only: [:new, :create, :edit]
	after_filter :add_lesson_to_profile, only: [:show]

	def index
		@home = true
		@lessons = Lesson.all
	end

	def list
		@lessons = Lesson.all
		render partial: 'list', locals: { lessons: @lessons }
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

	def destroy
		# can I delete anyone's lesson? do you need security verification here?
		Lesson.destroy(params[:id])
		flash[:notice] = "Lesson deleted"
		redirect_to profile_path current_user
	end

	private

	def add_lesson_to_profile
		if current_user
			current_user.lessons << @lesson unless current_user.lessons.include? @lesson
		end
	end
end
