class ContentsController < ApplicationController
	before_filter :is_logged_in?
	before_filter :valid_request, only: [ :update, :destroy, :sortorder]

	def create
		@content = Content.new(params[:content])
		if @content.save
			render partial: 'new_content', locals: { content: @content }, status: "201"
		else
			render text: "Invalid Request", status: "400"
		end
	end


	def update
		@content.update_attributes(params[:content])
		if @content.save
			render partial: 'new_content', locals: { content: @content }
		else
			render text: "Invalid Request", status: "400"
		end
	end


	def sortorder
		#TODO find way to branch reponse based on validations
		contents = params[:sortorder].each_with_index do |id, index|
			content = @lesson.contents.find_by_id(id.to_i)
			content.update_attributes(position: index)
		end
		render text: "Success", status: "200"
	end

	def destroy
		if @content.destroy
			render text: "Success", status: "200"
		else
			render text: "Invalid Request", status: "400"
		end
	end

	private

	def valid_request
		if @lesson = Lesson.find_by_id(Utilities.nested_hash_value(params, :lesson_id))
			bad_request unless @content = @lesson.contents.find_by_id(Utilities.nested_hash_value(params, :id)) || params[:sortorder].present?
		else
			bad_request
		end
	end

	def bad_request
		render text: "Invalid Request", status: "400"
		return false
	end

end