class ContentsController < ApplicationController

	def create
		@content = Content.new(params[:content])
		if @content.save
			render partial: 'new_content', locals: { content: @content }, status: "201"
		else
			render text: "Invalid Content", status: "400"
		end
	end


	def update
		if @content = Content.find_by_id(params[:id])
		@content.update_attributes(params[:content])
			if @content.save
				render partial: 'new_content', locals: { content: @content }
			end
		else
			render text: "Invalid Content", status: "400"
		end
	end
end