class LessonsController < ApplicationController
	def show
	end

	def index
	end
	
	def new
		@lesson = Lesson.new
		@lesson.contents.build
	end
end
