class ContentsController < ApplicationController
	before_filter :authenticate
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
		# I'd prefer moving this transaction logic to the model. return true or false and then render the response based on that
		Content.transaction do
			begin
			contents = params[:sortorder].each_with_index do |id, index|
				content = @lesson.contents.find_by_id(id.to_i)
				content.update_attributes(position: index)
			end
				render text: "Success", status: "200"
			rescue
				render text: "Invalid Request", status: "400"
			end
		end

	end

	def destroy
		if @content.destroy
			render text: "Success", status: "200"
		else
			render text: "Invalid Request", status: "400"
		end
	end

	private

	def valid_request # what does this do?
		if @lesson = Lesson.find_by_id(Utilities.nested_hash_value(params, :lesson_id)) # what is this?
			bad_request unless @content = @lesson.contents.find_by_id(Utilities.nested_hash_value(params, :id)) || params[:sortorder].present?
		else
			bad_request
		end
	end
end