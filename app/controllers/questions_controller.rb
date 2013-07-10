class QuestionsController < ApplicationController
  before_filter :authenticated

  def create
  	p params[:question]
  	@question = current_user.questions.build(params[:question])
  	if @question.save
    	render json: @question, status: '201'
    else
    	bad_request
    end
  end
  
end
