class ContentsController < ApplicationController
	def update
		p params
		content = Content.find(params[:id])
		content.update_attributes(params[:content_data])
		render json: {test: 'test'}
	end
end