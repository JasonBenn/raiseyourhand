class AnswersController < ApplicationController
	def create
		@answer = current_user.answers.build(params[:answer])
  	if @answer.save
    	render json: Answer.create(params[:answer]), status: '201'
    else
    	bad_request
    end
	end

end