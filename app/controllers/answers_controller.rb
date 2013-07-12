class AnswersController < ApplicationController
	def create
		p "params: #{params}"
		@answer = current_user.answers.build(params[:answer])
  	if @answer.save
    	render json: @anwers, status: '201'
    else
    	bad_request
    end
	end

end