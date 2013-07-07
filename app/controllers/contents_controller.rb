class ContentsController < ApplicationController

	def create
		@content = Content.new(params[:content])
		@lesson = @content.lesson
		@positionIndex = @content.position
		p @content
		if @content.save
			render partial: 'new_content', locals: { content: @content, lesson: @lesson, positionIndex: @positionIndex }, status: "201"
		else
			render text: "Invalid Content", status: "400"
		end
	end


	def update
		p params
		if @content = Content.find_by_id(params[:id])
		@content.update_attributes(params[:content])
		@lesson = @content.lesson
		@positionIndex = @content.position
			if @content.save
				render partial: 'new_content', locals: { content: @content, lesson: @lesson, positionIndex: @positionIndex }
			end
		else
			render text: "Invalid Content", status: "400"
		end
	end


	def sortorder
		#TODO find way to branch reponse based on validations
		@lesson = Lesson.find(params[:sortorder][:lesson_id])
		contents = params[:sortorder][:order].each_with_index do |id, index|
			content = @lesson.contents.find_by_id(id.to_i)
			content.update_attributes(position: index)
		end
		render text: "Success", status: "200"
	end
end