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
end