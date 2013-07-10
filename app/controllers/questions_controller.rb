class QuestionsController < ApplicationController
  before_filter :authenticated

  def create
  	@question = current_user.questions.build(params[:question])
  	if @question.save
    	render json: Question.create(params[:question]), status: '201'
    else
    	bad_request
    end
  end
  
end
