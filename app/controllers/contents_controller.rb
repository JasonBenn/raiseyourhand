class ContentsController < ApplicationController
	def update
		content = Content.find(params[:id])
		content.update_attributes(params[:content_data])
		render json: {test: 'test'}
	end

	def create
		@content = Content.create(
															url: params[:url],
															lesson_id: params[:lesson_id]
															)
		redirect_to content_path(@content.id)
	end

	def show
		@content = Content.find(params[:id])
		@lesson = @content.lesson
		@positionIndex = @lesson.contents.count - 1
		render layout: false
	end
end